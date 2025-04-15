import { TreeNode } from "./types/tree";
import { generateId } from "./utils";

export const buildBalancedBST = (
  sortedValues: number[],
  start = 0,
  end = sortedValues.length - 1
): TreeNode | null => {
  if (start > end) return null;

  const mid = Math.floor((start + end) / 2);
  const node: TreeNode = {
    id: generateId(),
    value: sortedValues[mid],
    left: null,
    right: null,
    state: "default",
  };

  node.left = buildBalancedBST(sortedValues, start, mid - 1);
  node.right = buildBalancedBST(sortedValues, mid + 1, end);

  return node;
};

// Helper function to generate a random sorted array
export const generateRandomSortedArray = (
  size: number,
  maxValue: number = 100
): number[] => {
  const uniqueValues = new Set<number>();
  while (uniqueValues.size < size) {
    uniqueValues.add(Math.floor(Math.random() * maxValue));
  }
  return Array.from(uniqueValues).sort((a, b) => a - b);
};

// Helper function to validate BST property
export const isValidBST = (
  node: TreeNode | null,
  min = -Infinity,
  max = Infinity
): boolean => {
  if (!node) return true;

  if (node.value <= min || node.value >= max) {
    return false;
  }

  return (
    isValidBST(node.left, min, node.value) &&
    isValidBST(node.right, node.value, max)
  );
};
