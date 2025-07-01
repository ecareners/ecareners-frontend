import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page with ellipsis
      if (currentPage <= 3) {
        // Near the beginning
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePageClick = (page) => {
    if (page !== '...' && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirst = () => {
    if (currentPage > 1) {
      onPageChange(1);
    }
  };

  const handleLast = () => {
    if (currentPage < totalPages) {
      onPageChange(totalPages);
    }
  };

  return (
    <nav className="mt-4 d-flex justify-content-center" aria-label="navigation">
      <ul className="pagination pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
        {/* First page button */}
        <li className={`page-item mb-0 ${currentPage === 1 ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={handleFirst}
            disabled={currentPage === 1}
            aria-label="Go to first page"
          >
            <FaAngleDoubleLeft />
          </button>
        </li>

        {/* Previous page button */}
        <li className={`page-item mb-0 ${currentPage === 1 ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={handlePrevious}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            <FaAngleLeft />
          </button>
        </li>

        {/* Page numbers */}
        {pageNumbers.map((page, index) => (
          <li 
            key={index} 
            className={`page-item mb-0 ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page === '...' ? (
              <span className="page-link">{page}</span>
            ) : (
              <button 
                className="page-link" 
                onClick={() => handlePageClick(page)}
                disabled={page === currentPage}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {/* Next page button */}
        <li className={`page-item mb-0 ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={handleNext}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            <FaAngleRight />
          </button>
        </li>

        {/* Last page button */}
        <li className={`page-item mb-0 ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={handleLast}
            disabled={currentPage === totalPages}
            aria-label="Go to last page"
          >
            <FaAngleDoubleRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
