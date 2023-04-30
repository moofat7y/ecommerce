import React, { useRef } from "react";
import { useSelector } from "react-redux";
const Filters = ({ setSortBy, sortBy }) => {
  const { brand, category } = useSelector((state) => state);
  const { brands } = brand;
  const { categories } = category;
  const lowPriceRef = useRef();
  const highPriceRef = useRef();
  const cat_list = categories?.map((cat) => {
    return (
      <div key={cat._id} className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="categories"
          id={cat._id}
          value={cat.title}
          onChange={(e) =>
            setSortBy((prev) => {
              return { ...prev, cat: `category=${cat.title}` };
            })
          }
        />
        <label className="form-check-label" htmlFor={cat._id}>
          {cat.title}
        </label>
      </div>
    );
  });

  const brand_list = brands?.map((brand) => {
    return (
      <div key={brand._id} className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="brands"
          id={brand._id}
          value={brand.title}
          onChange={(e) =>
            setSortBy((prev) => {
              return { ...prev, brand: `brand=${brand.title}` };
            })
          }
        />
        <label className="form-check-label" htmlFor={brand._id}>
          {brand.title}
        </label>
      </div>
    );
  });

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
    <div className="bg-white rounded-3 px-3 py-3 mt-2 mt-md-0 shadow-sm">
      <div className="sort mb-3">
        <h6>الترتيب</h6>
        <select
          onChange={(e) =>
            setSortBy((prev) => {
              return { ...prev, sort: e.target.value };
            })
          }
          className="form-select"
        >
          <option value="all">الكل</option>
          <option value="sort=-price">من الاعلي سعرا للاقل</option>
          <option value="sort=price">من الاقل سعرا للاعلي</option>
          <option value="sort=-sold">الاعلي مبيعا</option>
        </select>
      </div>
      <div className="cat mb-3">
        <h6>الاصناف</h6>
        <div className="cat-list">
          <div key="all" className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="categories"
              id="all"
              value="all"
              checked={sortBy.cat === "all" || !sortBy.cat}
              onChange={(e) =>
                setSortBy((prev) => {
                  return { ...prev, cat: "all" };
                })
              }
            />
            <label className="form-check-label" htmlFor="all">
              all
            </label>
          </div>
          {cat_list}
        </div>
      </div>

      <div className="brands mb-3">
        <h6>العلامات التجاريه</h6>
        <div className="brand-list">
          <div key="all" className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="brands"
              id="all"
              value="all"
              checked={sortBy.brand === "all" || !sortBy.brand}
              onChange={(e) =>
                setSortBy((prev) => {
                  return { ...prev, brand: "all" };
                })
              }
            />
            <label className="form-check-label" htmlFor="all">
              all
            </label>
          </div>
          {brand_list}
        </div>
      </div>

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
        <button type="submit" className="btn btn-primary mt-">
          بدأ
        </button>
      </form>
    </div>
  );
};

export default Filters;
