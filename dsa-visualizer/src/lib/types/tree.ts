export interface TreeNode {
  id: string;
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  state:
    | "default"
    | "inserting"
    | "searching"
    | "removing"
    | "highlighted"
    | "visited";
}

export interface FlatTreeNode {
  id: string;
  value: number;
  parentId: string | null;
  isLeftChild: boolean | null;
  level: number;
  state:
    | "default"
    | "inserting"
    | "searching"
    | "removing"
    | "highlighted"
    | "visited";
}

export type TreeOps = {
  data: FlatTreeNode[];
  insert: (value: number) => Promise<void>;
  remove: (value: number) => Promise<void>;
  search: (value: number) => Promise<void>;
  reset: () => void;
  inorderTraversal: () => Promise<number[]>;
  preorderTraversal: () => Promise<number[]>;
  postorderTraversal: () => Promise<number[]>;
  levelOrderTraversal: () => Promise<number[]>;
  isOperationInProgress: boolean;
  traversalResult: number[];
  loadDefaultTree: () => Promise<void>;
};
