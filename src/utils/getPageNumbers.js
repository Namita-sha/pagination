function getPageNumbers(currentPage, totalPages) {
  const pages = []
  let dotsAdded = false

  for (let i = 1; i <= totalPages; i++) {
    // first three pages and last three
    const show =i <= 3 ||i > totalPages - 3 ||Math.abs(i - currentPage) <= 1     // current page and its neighbours

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
