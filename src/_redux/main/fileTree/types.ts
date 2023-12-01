import { TFileNodeTreeData } from "@_node/index";
import { TNodeUid } from "@_node/types";

import { TTreeViewState } from "../types";
import { TFileAction } from "./event";

export type TFileTreeReducerState = {
  workspace: TWorkspace;
  project: TProject;
  fileTree: TFileNodeTreeData;
  initialFileUidToOpen: TNodeUid;
  prevFileUid: TNodeUid;
  currentFileUid: TNodeUid;
  prevRenderableFileUid: TNodeUid;

  fileTreeViewState: TTreeViewState;
  hoveredFileUid: TNodeUid;

  doingFileAction: boolean;
  lastFileAction: TFileAction;
};

export type TWorkspace = {
  name: string;
  projects: TProject[];
};

export type TProject = {
  context: TProjectContext;
  name: string;
  handler: FileSystemDirectoryHandle | null;
  favicon: string | null;
};
export type TProjectContext = "local" | "idb";
