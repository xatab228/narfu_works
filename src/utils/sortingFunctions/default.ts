function localCompareFn<T>(a: T, b: T): number {
  return (a > b) ? 1 : (a < b) ? -1 : 0
}
export default function defaultSort<T>(arr: T[], compareFn = localCompareFn): T[]{
  if (arr.length <= 1) return arr
  return arr.sort(compareFn)
}