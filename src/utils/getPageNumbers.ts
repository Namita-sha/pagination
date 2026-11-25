function getPageNumbers(current: number, total: number): (number | "...")[] {
  const pages: (number | "...")[] = []
  let dotsAdded = false

  for (let i = 1; i <= total; i++) {
    // first three pages and last three
    const show = i <= 3 || i > total - 3 || Math.abs(i - current) <= 1 // current page and its neighbours

    if (show) {
      pages.push(i)
      dotsAdded = false
    } else if (!dotsAdded) {
      pages.push("...")
      dotsAdded = true
    }
  }

  return pages
}

export default getPageNumbers