// O(n²)
function defaultCondition<T>(a: T,b: T): boolean {
  return a > b;
}
export default function bubbleSort<T>(arr: T[], compareFn = defaultCondition): T[]{
  if (arr.length <= 1) return arr;
  const localArr: T[] = JSON.parse(JSON.stringify(arr))
  for (let j = localArr.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {
      if (compareFn(localArr[i],localArr[i + 1])) {
        let temp = localArr[i];
        localArr[i] = localArr[i + 1];
        localArr[i + 1] = temp;
      }
    }
  }
  return localArr
}