import defaultSort from "@/utils/sortingFunctions/default";
import bubbleSort from "@/utils/sortingFunctions/bubble";
import shellSort from "@/utils/sortingFunctions/shell";
import quickSort from "@/utils/sortingFunctions/quick";

export enum SortingMethods {
  DEFAULT = 'default',
  BUBBLE = 'bubble',
  SHELL = 'shell',
  QUICK = 'quick'
}
export default {
  [SortingMethods.DEFAULT]: defaultSort,
  [SortingMethods.BUBBLE]: bubbleSort,
  [SortingMethods.SHELL]: shellSort,
  [SortingMethods.QUICK]: quickSort,
};