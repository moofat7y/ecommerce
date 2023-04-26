import React from "react";
import { useSelector } from "react-redux";
import ProdItem from "./ProdItem";

const ProductList = () => {
  const { products, isLoading } = useSelector((state) => state.product);

  const prod_list = products?.map((prod) => {
    return <ProdItem key={prod?._id} prod={prod} />;
  });
  return (
    <div className="products px-2 mt-3 row">
      {!isLoading ? (
        prod_list
      ) : (
        <>
          <div className="col-12 col-sm-6 col-lg-4 col-xl-3  px-1 mb-2">
            <div className="card loading shadow-sm border-0" aria-hidden="true">
              <div className="ratio ratio-4x3">
                <div className="card-img-top"></div>
              </div>
              <div className="card-body">
                <h5 className="card-title placeholder-glow">
                  <span className="placeholder col-6"></span>
                </h5>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-6"></span>
                  <span className="placeholder col-8"></span>
                </p>
                <a className="btn btn-primary disabled placeholder col-6"></a>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4 col-xl-3  px-1 mb-2">
            <div className="card loading shadow-sm border-0" aria-hidden="true">
              <div className="ratio ratio-4x3">
                <div className="card-img-top"></div>
              </div>
              <div className="card-body">
                <h5 className="card-title placeholder-glow">
                  <span className="placeholder col-6"></span>
                </h5>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-6"></span>
                  <span className="placeholder col-8"></span>
                </p>
                <a className="btn btn-primary disabled placeholder col-6"></a>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4 col-xl-3  px-1 mb-2">
            <div className="card loading shadow-sm border-0" aria-hidden="true">
              <div className="ratio ratio-4x3">
                <div className="card-img-top"></div>
              </div>
              <div className="card-body">
                <h5 className="card-title placeholder-glow">
                  <span className="placeholder col-6"></span>
                </h5>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-7"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-4"></span>
                  <span className="placeholder col-6"></span>
                  <span className="placeholder col-8"></span>
                </p>
                <a className="btn btn-primary disabled placeholder col-6"></a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
