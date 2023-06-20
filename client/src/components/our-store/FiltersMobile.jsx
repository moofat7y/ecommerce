import React, { useRef, useState } from "react";
import FiltersModal from "../FiltersModal";
import { sorts } from "../../utils/helpers";
import { useSelector } from "react-redux";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const FiltersMobile = ({ setSortBy, sortBy }) => {
  const [modal, setModal] = useState({ show: false, section: "" });
  const { brand, category } = useSelector((state) => state);
  const { brands } = brand;
  const { categories } = category;

  window.addEventListener("scroll", (e) => {
    const scrollTop = document.getElementById("filterd-ref")?.offsetTop;
    const windowScroll = window.scrollY;
    const elemetOffsetTop = scrollTop - windowScroll;
    if (elemetOffsetTop <= 0) {
      document.getElementById("slider-ref")?.classList.add("fixed-top");
    } else {
      document.getElementById("slider-ref")?.classList.remove("fixed-top");
    }
  });

  const lowPriceRef = useRef();
  const highPriceRef = useRef();
  const onPriceSubmit = (e) => {
    e.preventDefault();

    setSortBy((prev) => {
      return {
        ...prev,
        lowPrice: lowPriceRef.current.value
          ? `price[gte]=${lowPriceRef?.current?.value}`
          : null,
        higPrice: highPriceRef.current.value
          ? `price[lte]=${highPriceRef?.current?.value}`
          : null,
      };
    });
  };

  return (
    <div
      className="px-0 d-md-none"
      id="filterd-ref"
      style={{ height: "71.2px" }}
    >
      <div id="slider-ref" className=" px-2 col-12 mb-3 bg-white">
        <div className="mobile-filters py-2">
          <div className="d-flex gap-2 flex-nowrap">
            <div
              onClick={() => setModal({ show: true, section: "filter-sort" })}
              className="btn btn-primary d-flex flex-nowrap"
            >
              الترتيب <MdOutlineKeyboardArrowDown className="fs-5" />
            </div>

            <div
              onClick={() =>
                setModal({ show: true, section: "filter-category" })
              }
              className="btn btn-primary d-flex flex-nowrap"
            >
              الاصناف <MdOutlineKeyboardArrowDown className="fs-5" />
            </div>

            <div
              onClick={() => setModal({ show: true, section: "filter-brand" })}
              className="btn btn-primary d-flex flex-nowrap"
            >
              العلامات التجاريه <MdOutlineKeyboardArrowDown className="fs-5" />
            </div>

            <div
              onClick={() => setModal({ show: true, section: "filter-price" })}
              className="btn btn-primary d-flex flex-nowrap"
            >
              السعر <MdOutlineKeyboardArrowDown className="fs-5" />
            </div>
          </div>
        </div>
      </div>
      {modal.show ? (
        <FiltersModal
          section={modal.section}
          closeModal={() => setModal(false)}
        >
          <section className="filter-sort py-2 px-4">
            <h5>الترتيب</h5>
            <ul
              className="px-0 d-flex flex-wrap gap-2"
              style={{ listStyle: "none" }}
            >
              {sorts?.map((sort) => {
                return (
                  <li
                    key={sort.label}
                    onClick={() =>
                      setSortBy((prev) => {
                        return { ...prev, sort: sort.value };
                      })
                    }
                    className={`nav-item btn btn-light ${
                      sortBy.sort === sort.value ||
                      (!sortBy.sort && sort.value === "all")
                        ? "active disabled"
                        : ""
                    }`}
                  >
                    {sort.label}
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="filter-category py-2 px-4">
            <h5>الاصناف</h5>
            <ul
              className="px-0 d-flex flex-wrap gap-2"
              style={{ listStyle: "none" }}
            >
              <li
                onClick={() =>
                  setSortBy((prev) => {
                    return { ...prev, cat: "all" };
                  })
                }
                className={`nav-item btn btn-light ${
                  sortBy.cat === "all" || !sortBy.cat ? "active disabled" : ""
                }`}
              >
                الكل
              </li>
              {categories?.map((cat) => {
                return (
                  <li
                    key={cat.title}
                    onClick={() =>
                      setSortBy((prev) => {
                        return { ...prev, cat: `category=${cat.title}` };
                      })
                    }
                    className={`nav-item btn btn-light ${
                      sortBy.cat === `category=${cat.title}`
                        ? "active disabled"
                        : ""
                    }`}
                  >
                    {cat.title}
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="filter-brand py-2 px-4">
            <h5>العلامات التجاريه</h5>
            <ul
              className="px-0 d-flex flex-wrap gap-2"
              style={{ listStyle: "none" }}
            >
              <li
                onClick={() =>
                  setSortBy((prev) => {
                    return { ...prev, brand: "all" };
                  })
                }
                className={`nav-item btn btn-light ${
                  sortBy.brand === "all" || !sortBy.brand
                    ? "active disabled"
                    : ""
                }`}
              >
                الكل
              </li>
              {brands?.map((brand) => {
                return (
                  <li
                    key={brand.title}
                    onClick={() =>
                      setSortBy((prev) => {
                        return { ...prev, brand: `brand=${brand.title}` };
                      })
                    }
                    className={`nav-item btn btn-light ${
                      sortBy.brand === `brand=${brand.title}`
                        ? "active disabled"
                        : ""
                    }`}
                  >
                    {brand.title}
                  </li>
                );
              })}
            </ul>
          </section>
          <section className="filter-price py-2 px-4">
            <h5>السعر</h5>
            <form onSubmit={(e) => onPriceSubmit(e)} className="price">
              <h6>تصفيه حسب السعر</h6>
              <div className="d-flex flex-column gap-2">
                <div className="col px-1">
                  <input
                    ref={lowPriceRef}
                    min={0}
                    type="number"
                    className="form-control"
                    placeholder="الحد الادني"
                  />
                </div>
                <div className="col px-1">
                  <input
                    ref={highPriceRef}
                    min={0}
                    type="number"
                    className="form-control"
                    placeholder="الحد الاقصي"
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-2">
                بحث
              </button>
            </form>
          </section>
        </FiltersModal>
      ) : null}
    </div>
  );
};

export default FiltersMobile;
