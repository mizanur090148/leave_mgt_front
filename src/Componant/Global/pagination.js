const Pagination = ({
  visibleLinks = 10,
  page,
  totalPages,
  handlePageChange,
}) => {
  const paginationLink = () => {
    const halfVisibleLinks = Math.floor(visibleLinks / 2);
    let startPage = Math.max(1, page - halfVisibleLinks);
    let endPage = Math.min(totalPages, startPage + visibleLinks - 1);
    if (endPage - startPage + 1 < visibleLinks) {
      startPage = Math.max(1, endPage - visibleLinks + 1);
    }
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    ).map((pageNumber) => (
      <li
        key={pageNumber}
        className={`page-item btn btn-xs ${
          pageNumber === page ? "btn-primary" : "btn-outline-primary"
        }`}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </li>
    ));
  };

  return (
    <nav className="patination-nav">
      <ul className="pagination ">
        <li
          onClick={() => handlePageChange(page - 1)}
          className={`page-item btn btn-xs btn-outline-primary ${
            page === 1 ? "disabled" : ""
          }`}
        >
          Previous
        </li>
        {paginationLink()}
        <li
          className="page-item btn btn-xs btn-outline-primary"
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
