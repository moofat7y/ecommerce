import React from "react";

const Category = ({ category }) => {
  return (
    <div className="category w-fit-content p-3 shadow-sm d-flex gap-1 justify-content-between align-items-center bg-white">
      <div>
        <h4 className="fs-7 fw-bolder mb-1">
          <Link className="nav-link">{category.title}</Link>
        </h4>
        <p>{category.quantity} Items</p>
      </div>
      <img src={category.img} alt={category.title} />
    </div>
  );
};

export default Category;
