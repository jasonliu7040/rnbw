import { TNodeTreeData, TNodeUid } from "@_node/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TUpdateTreeViewStatePayload } from "../types";
import { TNodeTreeReducerState } from "./types";

const nodeTreeReducerInitialState: TNodeTreeReducerState = {
  nodeTree: {},
  validNodeTree: {},

  nodeTreeViewState: {
    focusedItem: "",
    expandedItems: [],
    expandedItemsObj: {},
    selectedItems: [],
    selectedItemsObj: {},
  },
  hoveredNodeUid: "",
};
const nodeTreeSlice = createSlice({
  name: "nodeTree",
  initialState: nodeTreeReducerInitialState,
  reducers: {
    setNodeTree(state, actions: PayloadAction<TNodeTreeData>) {
      const nodeTree = actions.payload;
      state.nodeTree = nodeTree;
    },
    setValidNodeTree(state, actions: PayloadAction<TNodeTreeData>) {
      const validNodeTree = actions.payload;
      state.validNodeTree = validNodeTree;
    },

    focusNodeTreeNode(state, action: PayloadAction<TNodeUid>) {
      const focusedItem = action.payload;
      state.nodeTreeViewState.focusedItem = focusedItem;
    },
    setExpandedNodeTreeNodes(state, action: PayloadAction<TNodeUid[]>) {
      const expandedItems = action.payload;
      state.nodeTreeViewState.expandedItems = expandedItems;
      state.nodeTreeViewState.expandedItemsObj = {};
      for (const uid of expandedItems) {
        state.nodeTreeViewState.expandedItemsObj[uid] = true;
      }
    },
    setAppendExpandedNodeTreeNodes(state, action: PayloadAction<TNodeUid[]>) {
      const expandedItems = action.payload;
      state.nodeTreeViewState.expandedItems = [
        ...state.nodeTreeViewState.expandedItems,
        ...expandedItems,
      ];
      for (const uid of expandedItems) {
        state.nodeTreeViewState.expandedItemsObj[uid] = true;
      }
    },
    expandNodeTreeNodes(state, action: PayloadAction<TNodeUid[]>) {
      const uids = action.payload;
      for (const uid of uids) {
        state.nodeTreeViewState.expandedItemsObj[uid] = true;
      }
      state.nodeTreeViewState.expandedItems = Object.keys(
        state.nodeTreeViewState.expandedItemsObj,
      );
    },
    collapseNodeTreeNodes(state, action: PayloadAction<TNodeUid[]>) {
      const uids = action.payload;
      for (const uid of uids) {
        delete state.nodeTreeViewState.expandedItemsObj[uid];
      }
      state.nodeTreeViewState.expandedItems = Object.keys(
        state.nodeTreeViewState.expandedItemsObj,
      );
    },
    selectNodeTreeNodes(state, action: PayloadAction<TNodeUid[]>) {
      const selectedItems = action.payload;
      state.nodeTreeViewState.selectedItems = selectedItems;
      state.nodeTreeViewState.selectedItemsObj = {};
      for (const uid of selectedItems) {
        state.nodeTreeViewState.selectedItemsObj[uid] = true;
      }
    },
    updateNodeTreeTreeViewState(
      state,
      action: PayloadAction<TUpdateTreeViewStatePayload>,
    ) {
      const { deletedUids = [], convertedUids = [] } = action.payload;
      deletedUids.map((uid) => {
        if (state.nodeTreeViewState.focusedItem === uid) {
          state.nodeTreeViewState.focusedItem = "";
        }
        delete state.nodeTreeViewState.expandedItemsObj[uid];
        delete state.nodeTreeViewState.selectedItemsObj[uid];
      });

      let f_uid: TNodeUid = "";
      const e_deletedUids: TNodeUid[] = [],
        e_addedUids: TNodeUid[] = [];
      const s_deletedUids: TNodeUid[] = [],
        s_addedUids: TNodeUid[] = [];

      for (const [prevUid, curUid] of convertedUids) {
        if (state.nodeTreeViewState.focusedItem === prevUid) {
          f_uid = curUid;
        }
        if (state.nodeTreeViewState.expandedItemsObj[prevUid]) {
          e_deletedUids.push(prevUid);
          e_addedUids.push(curUid);
        }
        if (state.nodeTreeViewState.selectedItemsObj[prevUid]) {
          s_deletedUids.push(prevUid);
          s_addedUids.push(curUid);
        }
      }

      state.nodeTreeViewState.focusedItem =
        f_uid !== "" ? f_uid : state.nodeTreeViewState.focusedItem;
      e_deletedUids.map((_deletedUid) => {
        delete state.nodeTreeViewState.expandedItemsObj[_deletedUid];
      });
      e_addedUids.map((_addedUid) => {
        state.nodeTreeViewState.expandedItemsObj[_addedUid] = true;
      });
      s_deletedUids.map((_deletedUid) => {
        delete state.nodeTreeViewState.selectedItemsObj[_deletedUid];
      });
      s_addedUids.map((_addedUid) => {
        state.nodeTreeViewState.selectedItemsObj[_addedUid] = true;
      });

      state.nodeTreeViewState.expandedItems = Object.keys(
        state.nodeTreeViewState.expandedItemsObj,
      );
      state.nodeTreeViewState.selectedItems = Object.keys(
        state.nodeTreeViewState.selectedItemsObj,
      );
    },
    setHoveredNodeUid(state, action: PayloadAction<TNodeUid>) {
      const hoveredNodeUid = action.payload;
      state.hoveredNodeUid = hoveredNodeUid;
    },
    clearNodeTreeViewState(state) {
      state.nodeTreeViewState = nodeTreeReducerInitialState.nodeTreeViewState;
    },
  },
});
export const {
  setNodeTree,
  setValidNodeTree,

  focusNodeTreeNode,
  setExpandedNodeTreeNodes,
  setAppendExpandedNodeTreeNodes,
  expandNodeTreeNodes,
  collapseNodeTreeNodes,
  selectNodeTreeNodes,
  updateNodeTreeTreeViewState,
  setHoveredNodeUid,
  clearNodeTreeViewState,
} = nodeTreeSlice.actions;
export const NodeTreeReducer = nodeTreeSlice.reducer;
