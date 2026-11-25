import getPageNumbers from '../utils/getPageNumbers'

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function Pagination({ currentPage, totalPages, onPageChange }: Props) {

  const pages = getPageNumbers(currentPage, totalPages)

  return (
    <ul className="pagination">
      <li>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}>
          Previous
        </button>
      </li>

      {pages.map((page, index) => (
        <li key={index}>
          {page === "..." ? (
            <span>...</span>
          ) : (
            <button
              className={page === currentPage ? "active" : ""}
              onClick={() => onPageChange(page)}>
              {page}
            </button>
          )}
        </li>
      ))}

      <li>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}>
          Next
        </button>
      </li>
    </ul>
  )
}

export default Pagination