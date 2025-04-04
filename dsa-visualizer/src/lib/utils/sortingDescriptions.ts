import { SortMethod } from "../types/sorting";

export function getSortAlgorithmDescription(method: SortMethod): string {
  switch (method) {
    case "bubble":
      return "Bubble sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. Time complexity: O(n²)";
    case "selection":
      return "Selection sort divides the array into a sorted and unsorted region, repeatedly selecting the smallest element from the unsorted region. Time complexity: O(n²)";
    case "insertion":
      return "Insertion sort builds the final sorted array one item at a time by repeatedly inserting a new element into the sorted portion of the array. Time complexity: O(n²)";
    case "merge":
      return "Merge sort is a divide-and-conquer algorithm that recursively splits the array in half, sorts, and then merges the sorted halves. Time complexity: O(n log n)";
    case "quick":
      return "Quick sort uses a divide-and-conquer strategy, selecting a 'pivot' element and partitioning the array around it. Time complexity: O(n log n) average case";
    case "heap":
      return "Heap sort converts the array into a heap data structure and repeatedly extracts the maximum element. Time complexity: O(n log n)";
    default:
      return "";
  }
}
