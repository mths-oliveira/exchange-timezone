export function sortListByPropertyKey<T = any>(
  list: T[],
  key: string,
  by: "asc" | "desc" = "asc"
) {
  const isDesc = by === "desc"
  const sortedList = list.sort((currentItem, nextItem) => {
    let isBefore = currentItem[key] > nextItem[key]
    if (isDesc) isBefore = !isBefore
    return isBefore ? 1 : -1
  })
  return sortedList
}
