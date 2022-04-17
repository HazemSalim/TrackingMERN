import React from "react";

import ReactPaginate from "react-paginate";

import PaginationWrapper from "../styled/PaginationWrapper";

const Paging = ({ total, handlePagination }) => {
  const count = Math.ceil(total / 10);

  const handlePaginationClick = ({ selected }) => {
    handlePagination(selected);
  };

  return (
    <PaginationWrapper data-testid="pagination">
      <ReactPaginate
        previousLabel="Previous"
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={count}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePaginationClick}
        containerClassName="pagination float-right"
        pageLinkClassName="page-link"
        pageClassName="page-item"
        activeClassName="active"
        previousClassName="page-item"
        nextClassName="page-item"
        breakClassName="page-link"
        nextLinkClassName="page-link"
        previousLinkClassName="page-link"
        disabledClassName="disabled"
      />
    </PaginationWrapper>
  );
};

export default Paging;
