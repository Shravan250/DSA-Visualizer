import { generateId } from "@/lib/utils";
import { useState, useEffect } from "react";
import { buildBalancedBST } from "@/lib/treeUtils"; // Importing the BST builder
import { FlatTreeNode, TreeNode, TreeOps } from "@/lib/types/tree";

export type TreeOperations = ReturnType<typeof useTreeOperations>;

export default function useTreeOperations() {
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [flatData, setFlatData] = useState<FlatTreeNode[]>([]);
  const [operationInProgress, setOperationInProgress] = useState(false);
  const [traversalResult, setTraversalResult] = useState<number[]>([]);

  // Helper function to create a unique ID
  const createId = () => generateId();

  // timing constants
  const ANIMATION_SPEED = {
    FAST: 300,
    NORMAL: 500,
    SLOW: 800,
  };

  // Helper to flatten tree for visualization
  const flattenTree = (
    node: TreeNode | null,
    parentId: string | null = null,
    isLeftChild: boolean | null = null,
    level: number = 0
  ): FlatTreeNode[] => {
    if (!node) return [];

    const flatNode: FlatTreeNode = {
      id: node.id,
      value: node.value,
      parentId,
      isLeftChild,
      level,
      state: node.state,
    };

    return [
      flatNode,
      ...flattenTree(node.left, node.id, true, level + 1),
      ...flattenTree(node.right, node.id, false, level + 1),
    ];
  };

  // Update the flattened data whenever the tree changes
  const updateFlatData = (newRoot: TreeNode | null) => {
    setFlatData(flattenTree(newRoot));
  };

  // Reset all node states to default
  const resetNodeStates = (node: TreeNode | null): TreeNode | null => {
    if (!node) return null;
    return {
      ...node,
      state: "default",
      left: resetNodeStates(node.left),
      right: resetNodeStates(node.right),
    };
  };

  // Load a default tree with predefined values
  const loadDefaultTree = async () => {
    if (operationInProgress) return;
    setOperationInProgress(true);

    try {
      // Create a balanced tree with these values
      const treeValues = [10, 5, 15, 3, 7, 12, 20];
      const sortedValues = [...treeValues].sort((a, b) => a - b);

      const newRoot = buildBalancedBST(sortedValues);

      // Animate the insertion
      for (let i = 0; i < treeValues.length; i++) {
        const updatedRoot = { ...newRoot };

        // Find the node with this value and highlight it
        const highlightNode = (
          node: TreeNode | null,
          value: number
        ): TreeNode | null => {
          if (!node) return null;

          if (node.value === value) {
            return { ...node, state: "inserting" };
          }

          return {
            ...node,
            left: highlightNode(node.left, value),
            right: highlightNode(node.right, value),
          };
        };

        const highlightedRoot = highlightNode(updatedRoot, sortedValues[i]);
        setRoot(highlightedRoot);
        updateFlatData(highlightedRoot);

        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      // Reset states after all insertions
      const resetRoot = resetNodeStates(newRoot);
      setRoot(resetRoot);
      updateFlatData(resetRoot);
    } finally {
      setOperationInProgress(false);
    }
  };

  // Insert implementation
  const insert = async (value: number) => {
    if (operationInProgress) return;
    setOperationInProgress(true);

    try {
      const newNode: TreeNode = {
        id: createId(),
        value,
        left: null,
        right: null,
        state: "inserting",
      };

      if (!root) {
        setRoot(newNode);
        updateFlatData(newNode);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const resetRoot = resetNodeStates(newNode);
        setRoot(resetRoot);
        updateFlatData(resetRoot);
      } else {
        let current = root;
        const path: TreeNode[] = [];

        while (true) {
          path.push(current);
          // Update visualization for current search path
          const updatedRoot = { ...root };
          path.forEach((node) => {
            node.state = "searching";
          });
          setRoot(updatedRoot);
          updateFlatData(updatedRoot);
          await new Promise((resolve) => setTimeout(resolve, 500));

          if (value < current.value) {
            if (!current.left) {
              current.left = newNode;
              break;
            }
            current = current.left;
          } else {
            if (!current.right) {
              current.right = newNode;
              break;
            }
            current = current.right;
          }
        }

        // Reset states after insertion
        const resetRoot = resetNodeStates(root);
        setRoot(resetRoot);
        updateFlatData(resetRoot);
      }
    } finally {
      setOperationInProgress(false);
    }
  };

  const remove = async (value: number) => {
    if (operationInProgress || !root) return;
    setOperationInProgress(true);

    try {
      const path: TreeNode[] = [];
      let current = root;

      // Animate search for node to delete
      while (current && current.value !== value) {
        path.push(current);
        const updatedRoot = { ...root };
        path.forEach((node) => {
          node.state = "searching";
        });
        setRoot(updatedRoot);
        updateFlatData(updatedRoot);
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (value < current.value) {
          current = current.left;
        } else {
          current = current.right;
        }
      }

      if (current) {
        current.state = "removing";
        const updatedRoot = { ...root };
        setRoot(updatedRoot);
        updateFlatData(updatedRoot);
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Perform deletion
        const newRoot = deleteNode(root, value);
        setRoot(newRoot);
        updateFlatData(newRoot);
      }

      // Reset states
      await new Promise((resolve) => setTimeout(resolve, 500));
      const resetRoot = resetNodeStates(root);
      setRoot(resetRoot);
      updateFlatData(resetRoot);
    } finally {
      setOperationInProgress(false);
    }
  };

  const search = async (value: number) => {
    if (operationInProgress || !root) return;
    setOperationInProgress(true);

    try {
      let current = root;
      const path: TreeNode[] = [];

      while (current) {
        path.push(current);
        const updatedRoot = { ...root };
        path.forEach((node) => {
          node.state = "searching";
        });
        setRoot(updatedRoot);
        updateFlatData(updatedRoot);
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (value === current.value) {
          current.state = "highlighted";
          const updatedRoot = { ...root };
          setRoot(updatedRoot);
          updateFlatData(updatedRoot);
          break;
        }

        current = value < current.value ? current.left : current.right;
      }

      // Reset states
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const resetRoot = resetNodeStates(root);
      setRoot(resetRoot);
      updateFlatData(resetRoot);
    } finally {
      setOperationInProgress(false);
    }
  };

  const reset = () => {
    setRoot(null);
    setFlatData([]);
    setOperationInProgress(false);
    setTraversalResult([]);
  };

  const inorderTraversal = async () => {
    if (operationInProgress || !root) return [];
    setOperationInProgress(true);

    try {
      const result: number[] = [];
      const inorder = async (node: TreeNode | null) => {
        if (!node) return;
        await inorder(node.left);

        // Visualize current node
        node.state = "visited";
        const updatedRoot = { ...root };
        setRoot(updatedRoot);
        updateFlatData(updatedRoot);
        result.push(node.value);
        await new Promise((resolve) => setTimeout(resolve, 800));

        await inorder(node.right);
      };

      await inorder(root);

      // Reset states
      const resetRoot = resetNodeStates(root);
      setRoot(resetRoot);
      updateFlatData(resetRoot);
      setTraversalResult(result);
      return result;
    } finally {
      setOperationInProgress(false);
    }
  };

  const preorderTraversal = async () => {
    if (operationInProgress || !root) return [];
    setOperationInProgress(true);

    try {
      const result: number[] = [];
      const preorder = async (node: TreeNode | null) => {
        if (!node) return;

        // Visualize current node
        node.state = "visited";
        const updatedRoot = { ...root };
        setRoot(updatedRoot);
        updateFlatData(updatedRoot);
        result.push(node.value);
        await new Promise((resolve) => setTimeout(resolve, 800));

        await preorder(node.left);
        await preorder(node.right);
      };

      await preorder(root);

      // Reset states
      const resetRoot = resetNodeStates(root);
      setRoot(resetRoot);
      updateFlatData(resetRoot);
      setTraversalResult(result);
      return result;
    } finally {
      setOperationInProgress(false);
    }
  };

  const postorderTraversal = async () => {
    if (operationInProgress || !root) return [];
    setOperationInProgress(true);

    try {
      const result: number[] = [];
      const postorder = async (node: TreeNode | null) => {
        if (!node) return;
        await postorder(node.left);
        await postorder(node.right);

        // Visualize current node
        node.state = "visited";
        const updatedRoot = { ...root };
        setRoot(updatedRoot);
        updateFlatData(updatedRoot);
        result.push(node.value);
        await new Promise((resolve) => setTimeout(resolve, 800));
      };

      await postorder(root);

      // Reset states
      const resetRoot = resetNodeStates(root);
      setRoot(resetRoot);
      updateFlatData(resetRoot);
      setTraversalResult(result);
      return result;
    } finally {
      setOperationInProgress(false);
    }
  };

  const levelOrderTraversal = async () => {
    if (operationInProgress || !root) return [];
    setOperationInProgress(true);

    try {
      const result: number[] = [];
      const queue: TreeNode[] = [root];

      while (queue.length > 0) {
        const current = queue.shift()!;

        // Visualize current node
        current.state = "visited";
        const updatedRoot = { ...root };
        setRoot(updatedRoot);
        updateFlatData(updatedRoot);
        result.push(current.value);
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }

      // Reset states
      const resetRoot = resetNodeStates(root);
      setRoot(resetRoot);
      updateFlatData(resetRoot);
      setTraversalResult(result);
      return result;
    } finally {
      setOperationInProgress(false);
    }
  };

  // Helper functions
  const deleteNode = (
    root: TreeNode | null,
    value: number
  ): TreeNode | null => {
    if (!root) return null;

    if (value < root.value) {
      root.left = deleteNode(root.left, value);
      return root;
    }
    if (value > root.value) {
      root.right = deleteNode(root.right, value);
      return root;
    }

    if (!root.left) return root.right;
    if (!root.right) return root.left;

    let temp = root.right;
    while (temp.left) temp = temp.left;
    root.value = temp.value;
    root.right = deleteNode(root.right, temp.value);
    return root;
  };

  // Update the state management to be more efficient
  const updateTreeState = (
    node: TreeNode | null,
    state: TreeNode["state"],
    shouldUpdateFlatData: boolean = true
  ) => {
    if (!node) return;

    const updatedRoot = { ...root };
    const updateNodeState = (
      n: TreeNode | null,
      id: string,
      newState: TreeNode["state"]
    ): TreeNode | null => {
      if (!n) return null;
      if (n.id === id) return { ...n, state: newState };
      return {
        ...n,
        left: updateNodeState(n.left, id, newState),
        right: updateNodeState(n.right, id, newState),
      };
    };

    const newRoot = updateNodeState(updatedRoot, node.id, state);
    setRoot(newRoot);
    if (shouldUpdateFlatData) {
      updateFlatData(newRoot);
    }
  };

  //load default tree
  useEffect(() => {
    loadDefaultTree();
  }, []);

  return {
    data: flatData,
    insert,
    remove,
    search,
    reset,
    inorderTraversal,
    preorderTraversal,
    postorderTraversal,
    levelOrderTraversal,
    isOperationInProgress: operationInProgress,
    traversalResult,
    loadDefaultTree,
  } as TreeOps;
}
