// react modules
import React from "react";
import { useSelector } from "react-redux";
// componentes
import Category from "./Category";
import Section from "../Section";

const Categories = () => {
  const { category, isLoading, isError } = useSelector(
    (state) => state.category
  );

  return (
    <Section className="home-wrapper-3">
      <div className="categories bg-white shadow-lg rounded-3 p-3 row gap-1 justify-content-center flex-wrap align-items-center">
        {isLoading &&
          category.map((category) => (
            <Category key={category?.id} category={category} />
          ))}
        {!isLoading && (
          <div className="category w-fit-content p-3 shadow-sm d-flex gap-1 justify-content-between align-items-center bg-white">
            <div>
              <h4 className="fs-7 fw-bolder mb-1 placeholder-glow">
                <span className="placeholder col-6"></span>
              </h4>
              <p className="placeholder-glow">
                <span className="placeholder col-4"></span>
              </p>
            </div>
            {/* <img src={img} alt={title} /> */}
          </div>
        )}
      </div>
    </Section>
  );
};

export default Categories;
