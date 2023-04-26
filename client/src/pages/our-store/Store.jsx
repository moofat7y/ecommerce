import React, { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import Filters from "../../components/our-store/Filters";
import { useDispatch } from "react-redux";
import { getProducts } from "../../features/product/productSlice";
import ProductList from "../../components/our-store/ProductList";
import Pagination from "../../components/our-store/Pagination";

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
      <header className="bg-white d-flex justify-content-center py-4">
        <span className="fs-6  text-secondary">
          <span className="">الرئيسيه</span>
          <BsDot className="fs-5" />
          <span>متجرنا</span>
        </span>
      </header>

      <div className="container">
        <div className="row my-3">
          <div className="col-2 col-md-4 col-lg-3">
            <Filters sortBy={sortBy} setSortBy={setSortBy} />
          </div>
          <div className="col-10 col-md-8 col-lg-9">
            <div className="bg-white py-2 px-3 rounded-3">
              <div className="d-flex align-items-center flex-nowrap">
                <span className="mx-2 d-inline-block">الترتيب حسب : </span>
                <select
                  onChange={(e) =>
                    setSortBy((prev) => {
                      return { ...prev, sort: e.target.value };
                    })
                  }
                  className="form-select w-auto z-index-10"
                >
                  <option value="all">الكل</option>
                  <option value="sort=-price">حسب السعر</option>
                  <option value="sort=-sold">الاعلي مبيعا</option>
                </select>
              </div>
            </div>

            <ProductList />
            <Pagination setSortBy={setSortBy} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
