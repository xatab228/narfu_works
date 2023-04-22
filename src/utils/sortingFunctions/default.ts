
export function defaultSort<T>(arr: T[]){
  if (arr.length <= 1) return arr
  return arr.sort((a,b) => (a > b) ? 1 : (a < b) ? -1 : 0)
}