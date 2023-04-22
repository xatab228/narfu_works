import sortingFunctions from "@/utils/sortingFunctions";
import type ParallelOptions from "@/utils/parallel";

self.onmessage = (e) => {
  const data = e.data;

  const arr = data.data;
  const options: ParallelOptions = data.options;

  const sortFunction = sortingFunctions[options.sortingMethod];
  const result = sortFunction(arr);
  self.postMessage(result)
}