
export function useParallel(data: number[],fn: (arg: number) => number){
  //@ts-ignore
  const parallel = new Parallel(data)
  console.log(parallel)

}