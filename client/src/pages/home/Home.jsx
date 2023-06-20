// react modules
import React from "react";
// react componentes
import { Link } from "react-router-dom";
// componentes
import Section from "../../components/Section";
import FeatureCollection from "../../components/home/FeatureCollection";
import OurPopularProduct from "../../components/home/OurPopularProduct";
import image1 from "../../assets/main-banner-1.jpg";
import image2 from "../../assets/main-banner.jpg";
import image3 from "../../assets/catbanner-01.jpg";
import image4 from "../../assets/catbanner-02.jpg";
import image5 from "../../assets/catbanner-03.jpg";
import image6 from "../../assets/catbanner-04.jpg";
import cat1 from "../../assets/service.png";
import cat2 from "../../assets/service-02.png";
import cat3 from "../../assets/service-03.png";
import cat4 from "../../assets/service-04.png";
import cat5 from "../../assets/service-05.png";
import BestSeller from "../../components/home/BestSeller";
const Home = () => {
  return (
    <div className="home">
      <section className="home-wrapper-1 py-4 py-lg-5 ">
        <div className="container">
          <div className="row align-items-center">
            <div className="px-4 px-lg-3 col-12 col-lg-6 p-3">
              <div
                id="carouselExampleCaptions"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                </div>
                <div className="carousel-inner rounded-3">
                  <div className="carousel-item active">
                    <img src={image1} className="d-block w-100" alt="..." />
                    <div className="carousel-caption text-start">
                      <span className="text-danger fs-7 text-uppercase">
                        Best Sake
                      </span>
                      <h1 className="fs-2 text-black fw-bolder">
                        <Link to={"/"} className="nav-link">
                          iPad S13+ Pro.
                        </Link>
                      </h1>
                      <p>
                        From $999.00 <br /> or $41.62/mo.
                      </p>
                      <button className="buy-btn rounded-pill btn btn-outline-primary">
                        <Link
                          to={"/"}
                          className="nav-link text-capitalize fs-7 fw-bold "
                        >
                          buy now
                        </Link>
                      </button>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img src={image2} className="d-block w-100" alt="..." />
                    <div className="carousel-caption text-start">
                      <span className="text-danger fs-7 text-uppercase">
                        Best Sake
                      </span>
                      <h1 className="fs-2 text-black fw-bolder">
                        <Link to={"/"} className="nav-link">
                          iPad S13+ Pro.
                        </Link>
                      </h1>
                      <p>
                        From $999.00 <br /> or $41.62/mo.
                      </p>
                      <button className="buy-btn rounded-pill btn btn-outline-primary">
                        <Link
                          to={"/"}
                          className="nav-link text-capitalize fs-7 fw-bold "
                        >
                          buy now
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 p-3 pt-0 pt-lg-3 pe-lg-0 d-flex flex-wrap justify-content-center align-items-center">
              <div className="col-12 col-sm-6 p-2 d-flex justify-content-end align-items-center align-items-sm-start small-banner position-relative">
                <img
                  src={image3}
                  className="img-fluid w-100 rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute p-5 p-sm-4 text-start">
                  <span className="text-danger fs-9 text-uppercase d-block mb-2">
                    Best Sake
                  </span>
                  <h2 className="fs-5 fs-sm-6 fw-bold text-capitalize mb-2">
                    <Link to={"/"} className="nav-link">
                      iPad S13+ Pr
                    </Link>
                  </h2>
                  <p className="fs-sm-8">
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-6 p-2 d-flex justify-content-end align-items-center align-items-sm-start small-banner position-relative">
                <img
                  src={image4}
                  className="img-fluid w-100 rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content p-5 p-sm-4 text-start position-absolute">
                  <span className="text-danger fs-9 text-uppercase d-block mb-2">
                    NEW ARRIVAL
                  </span>
                  <h2 className="fs-5 fs-sm-6 fw-bold text-capitalize mb-2">
                    <Link to={"/"} className="nav-link">
                      But IPad Air
                    </Link>
                  </h2>
                  <p className="fs-sm-8">
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-6 p-2 d-flex justify-content-end align-items-center align-items-sm-start small-banner position-relative ">
                <img
                  src={image5}
                  className="img-fluid w-100 rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content p-5 p-sm-4 text-start position-absolute">
                  <span className="text-danger fs-9 text-uppercase d-block mb-2">
                    NEW ARRIVAL
                  </span>
                  <h2 className="fs-5 fs-sm-6 fw-bold text-capitalize mb-2">
                    <Link to={"/"} className="nav-link">
                      But IPad Air
                    </Link>
                  </h2>
                  <p className="fs-sm-8">
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
              <div className="col-12 col-sm-6 p-2 d-flex justify-content-end align-items-center align-items-sm-start small-banner position-relative ">
                <img
                  src={image6}
                  className="img-fluid w-100 rounded-3"
                  alt="main banner"
                />
                <div className="small-banner-content p-5 p-sm-4 text-start position-absolute">
                  <span className="text-danger fs-9 text-uppercase d-block mb-2">
                    NEW ARRIVAL
                  </span>
                  <h2 className="fs-5 fs-sm-6 fw-bold text-capitalize mb-2">
                    <Link to={"/"} className="nav-link">
                      But IPad Air
                    </Link>
                  </h2>
                  <p className="fs-sm-8">
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Section className="home-wrapper-2">
        <div className="servies row gap-3 align-items-center justify-content-center justify-content-lg-between">
          <div className="w-fit-content d-flex align-items-center gap-3">
            <img src={cat1} alt="services" />
            <div>
              <h3 className="text-capitalize fs-7 fw-bolder mb-1">
                free shipping
              </h3>
              <p className="mb-0 fs-8">from all orders over $100</p>
            </div>
          </div>
          <div className="w-fit-content d-flex align-items-center gap-3">
            <img src={cat2} alt="services" />
            <div>
              <h3 className="text-capitalize fs-7 fw-bolder mb-1">
                daily surprises offers
              </h3>
              <p className="mb-0 fs-8">save up to 25% off</p>
            </div>
          </div>
          <div className="w-fit-content d-flex align-items-center gap-3">
            <img src={cat3} alt="services" />
            <div>
              <h3 className="text-capitalize fs-7 fw-bolder mb-1">
                support 24/7
              </h3>
              <p className="mb-0 fs-8">shop with an export</p>
            </div>
          </div>
          <div className="w-fit-content d-flex align-items-center gap-3">
            <img src={cat4} alt="services" />
            <div>
              <h3 className="text-capitalize fs-7 fw-bolder mb-1">
                affordable prices
              </h3>
              <p className="mb-0 fs-8">get factory direct price</p>
            </div>
          </div>
          <div className="w-fit-content d-flex align-items-center gap-3">
            <img src={cat5} alt="services" />
            <div>
              <h3 className="text-capitalize fs-7 fw-bolder mb-1">
                secure payment
              </h3>
              <p className="mb-0 fs-8">100% protected payments</p>
            </div>
          </div>
        </div>
      </Section>
      <FeatureCollection />
      <OurPopularProduct />
      <BestSeller />
    </div>
  );
};

export default Home;
