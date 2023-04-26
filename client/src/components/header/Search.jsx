import React from "react";

const Search = () => {
  return (
    <form
      className="d-flex col-12 col-md-3 order-3 order-md-2 order-xl-3"
      role="search"
    >
      <input
        className="form-control me-2 bg-light rounded-pill"
        type="search"
        placeholder="بحث"
        aria-label="Search"
      />
    </form>
  );
};

export default Search;
