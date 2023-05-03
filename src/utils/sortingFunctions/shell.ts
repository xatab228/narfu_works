function defaultCondition<T>(a: T,b: T): boolean {
  return a > b;
}
export default function shellSort<T>(arr: T[], compareFn = defaultCondition): T[]{
  if (arr.length <= 1) return arr;
  const localArr: T[] = JSON.parse(JSON.stringify(arr))
  let gap = Math.floor(localArr.length / 2);
  while (gap >= 1) {
    for (let i = gap; i < localArr.length; i++) {
      const current = localArr[i];
      let j = i;
      while (j > 0 && compareFn(localArr[j - gap], current)) {
        localArr[j] = localArr[j - gap];
        j -= gap;
      }
      localArr[j] = current;
    }
    gap = Math.floor(gap / 2);
  }
  return localArr;
}