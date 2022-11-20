import { createSelector } from 'reselect';

import { AppState } from '@_redux/_root';

// focusedItem selector
const ffGetFocusedItem = (state: AppState) => state.ff.focusedItem
export const ffGetFocusedItemSelector = createSelector(ffGetFocusedItem, (focusedItem) => focusedItem)

// expandedItems selector
const ffGetExpandedItems = (state: AppState) => state.ff.expandedItems
export const ffGetExpandedItemsSelector = createSelector(ffGetExpandedItems, (expandedItems) => expandedItems)

// selectedItems selector
const ffGetSelectedItems = (state: AppState) => state.ff.selectedItems
export const ffGetSelectedItemsSelector = createSelector(ffGetSelectedItems, (selectedItems) => selectedItems)