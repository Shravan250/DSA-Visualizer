import { SearchMethod } from "../types/searching";

export function getSearchAlgorithmDescription(method: SearchMethod): string {
  switch (method) {
    case "linear":
      return "Linear search sequentially checks each element until a match is found. Time complexity: O(n)";
    case "binary":
      return "Binary search works on sorted arrays by repeatedly dividing the search space in half. Time complexity: O(log n)";
    case "jump":
      return "Jump search works on sorted arrays by jumping fixed steps and then using linear search. Time complexity: O(√n)";
    case "interpolation":
      return "Interpolation search improves binary search by making intelligent guesses based on the value being searched. Time complexity: O(log log n) average case";
    case "exponential":
      return "Exponential search works by finding a range where the element might be present and then using binary search. Time complexity: O(log n)";
    default:
      return "";
  }
}
