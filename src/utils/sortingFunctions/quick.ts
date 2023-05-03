function defaultCondition<T>(a: T,b: T): boolean {
  return a > b;
}
export default function quickSort<T>(arr: T[], compareFn = defaultCondition): T[]{
  if (arr.length <= 1) return arr;
  const localArr: T[] = JSON.parse(JSON.stringify(arr))

  const pivot = localArr[localArr.length - 1];
  const leftList = [];
  const rightList = [];

  for (let i = 0; i < localArr.length - 1; i++) {
    if (compareFn(pivot,localArr[i])) {
      leftList.push(localArr[i]);
    }
    else {
      rightList.push(localArr[i])
    }
  }

  return [...quickSort(leftList,compareFn), pivot, ...quickSort(rightList,compareFn)];
}