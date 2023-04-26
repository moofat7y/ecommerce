import React, { useState } from "react";
import { useSelector } from "react-redux";

let limit = 2;
let count = 0;
const pages = [];

const Pagination = ({ setSortBy }) => {
  const { productsCount } = useSelector((state) => state.product);
  const [currentPage, setCurrentPage] = useState(1);
  const pagesCount = Math.ceil(productsCount / 10);
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <>
      {productsCount > 10 ? (
        <nav aria-label="Page navigation example">
          <ul className="pagination px-0">
            <li className="page-item">
              <a
                onClick={(e) => {
                  setCurrentPage((prev) => (prev !== 1 ? prev - 1 : prev));
                  setSortBy((prev) => {
                    return currentPage - 1 < 1
                      ? prev
                      : { ...prev, page: `page=${currentPage - 1}` };
                  });
                }}
                className="page-link"
                href="#"
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a
                role="button"
                onClick={(e) => {
                  setCurrentPage(1);
                  setSortBy((prev) => {
                    return { ...prev, page: `page=1` };
                  });
                }}
                className={`page-link ${
                  1 == currentPage ? "disabled bg-primary text-white" : ""
                }`}
                href="#"
              >
                1
              </a>
            </li>
            {pages.slice(1, pagesCount).map((page, i) => {
              if (currentPage == 2 || currentPage < count + limit) {
                count = 0;
              } else if (currentPage > limit && currentPage == page) {
                count++;
              }
              if (i < count) return;
              if (
                (page >= count && i < count + limit) ||
                (i < limit && currentPage == 1)
              )
                return (
                  <li key={i} className="page-item">
                    <a
                      role="button"
                      onClick={(e) => {
                        setCurrentPage((prev) => page);
                        setSortBy((prev) => {
                          return currentPage === page
                            ? prev
                            : { ...prev, page: `page=${page}` };
                        });
                      }}
                      className={`page-link ${
                        page == currentPage
                          ? "disabled bg-primary text-white"
                          : ""
                      }`}
                      href="#"
                    >
                      {page}
                    </a>
                  </li>
                );
              return;
            })}
            <li className="page-item">
              <a
                onClick={(e) => {
                  setCurrentPage((prev) =>
                    prev !== pagesCount ? prev + 1 : prev
                  );
                  setSortBy((prev) => {
                    return currentPage + 1 > pagesCount
                      ? prev
                      : { ...prev, page: `page=${currentPage + 1}` };
                  });
                }}
                className="page-link"
                href="#"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      ) : null }
    </>
  );
};

export default Pagination;
