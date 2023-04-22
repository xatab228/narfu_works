import {defaultSort} from "@/utils/sortingFunctions/default";

export enum SortingMethods {
  DEFAULT = 'default'
}
export default {
  [SortingMethods.DEFAULT]: defaultSort
};