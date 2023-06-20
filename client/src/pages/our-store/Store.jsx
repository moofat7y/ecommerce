import React, { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import Filters from "../../components/our-store/Filters";
import { useDispatch } from "react-redux";
import { getProducts } from "../../features/product/productSlice";
import ProductList from "../../components/our-store/ProductList";
import Pagination from "../../components/our-store/Pagination";
import FiltersMobile from "../../components/our-store/FiltersMobile";

const Store = () => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState({
    cat: "",
    brand: "",
    lowPrice: "",
    higPrice: "",
    page: "",
    search: "",
  });
  let sorts = [];

  Object.entries(sortBy).map(([key, value]) => {
    if (!value || value === "all") {
      return;
    }
    sorts.push(value);
  });
  const query = sorts?.join("&");
  useEffect(() => {
    if (
      sortBy.brand ||
      sortBy.cat ||
      sortBy.sort ||
      sortBy.lowPrice ||
      sortBy.higPrice ||
      sortBy.page ||
      sortBy.search
    ) {
      dispatch(getProducts({ query }));
    }
  }, [sortBy]);

  return (
    <div className="store">
      <div className="container">
        <div className="row my-3">
          <FiltersMobile setSortBy={setSortBy} sortBy={sortBy} />

          <div className="d-none d-md-block col-md-4 col-lg-3 col-xl-2">
            <Filters sortBy={sortBy} setSortBy={setSortBy} />
          </div>
          <div className="col-12 col-md-8 col-lg-9 col-xl-10">
            <ProductList />
            <Pagination setSortBy={setSortBy} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
