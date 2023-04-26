// react modules
import React from "react";
// react componentes
import { Link } from "react-router-dom";
// componentes
import Section from "../../components/Section";
import FeatureCollection from "../../components/home/FeatureCollection";
import OurPopularProduct from "../../components/home/OurPopularProduct";

const Home = () => {
  return (
    <div className="home">
      <Section className="home-wrapper-1">
        <div className="row align-items-center">
          <div className="col-12 col-lg-6 p-3">
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
                  <img
                    src="images/main-banner-1.jpg"
                    className="d-block w-100"
                    alt="..."
                  />
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
                  <img
                    src="images/main-banner.jpg"
                    className="d-block w-100"
                    alt="..."
                  />
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
                src="images/catbanner-01.jpg"
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
                src="images/catbanner-02.jpg"
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
                src="images/catbanner-03.jpg"
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
                src="images/catbanner-04.jpg"
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
      </Section>
      <Section className="home-wrapper-2">
        <div className="servies row gap-3 align-items-center justify-content-center justify-content-lg-between">
          <div className="w-fit-content d-flex align-items-center gap-3">
            <img src="images/service.png" alt="services" />
            <div>
              <h3 className="text-capitalize fs-7 fw-bolder mb-1">
                free shipping
              </h3>
              <p className="mb-0 fs-8">from all orders over $100</p>
            </div>
          </div>
          <div className="w-fit-content d-flex align-items-center gap-3">
            <img src="images/service-02.png" alt="services" />
            <div>
              <h3 className="text-capitalize fs-7 fw-bolder mb-1">
                daily surprises offers
              </h3>
              <p className="mb-0 fs-8">save up to 25% off</p>
            </div>
          </div>
          <div className="w-fit-content d-flex align-items-center gap-3">
            <img src="images/service-03.png" alt="services" />
            <div>
              <h3 className="text-capitalize fs-7 fw-bolder mb-1">
                support 24/7
              </h3>
              <p className="mb-0 fs-8">shop with an export</p>
            </div>
          </div>
          <div className="w-fit-content d-flex align-items-center gap-3">
            <img src="images/service-04.png" alt="services" />
            <div>
              <h3 className="text-capitalize fs-7 fw-bolder mb-1">
                affordable prices
              </h3>
              <p className="mb-0 fs-8">get factory direct price</p>
            </div>
          </div>
          <div className="w-fit-content d-flex align-items-center gap-3">
            <img src="images/service-05.png" alt="services" />
            <div>
              <h3 className="text-capitalize fs-7 fw-bolder mb-1">
                secure payment
              </h3>
              <p className="mb-0 fs-8">100% protected payments</p>
            </div>
          </div>
        </div>
      </Section>
      <Section className="home-wrapper-3">
        <div className="categories bg-white shadow-lg rounded-3 p-3 row gap-1 justify-content-center flex-wrap align-items-center">
          <div className="category p-3 shadow-sm d-flex gap-1 justify-content-between align-items-center bg-white">
            <div>
              <h4 className="fs-7 fw-bolder mb-1">
                <Link className="nav-link">computers & laptop</Link>
              </h4>
              <p className="fs-9 text-muted">10 Items</p>
            </div>
            <img src="images/camera.jpg" alt="camera" />
          </div>
          <div className="category p-3 shadow-sm d-flex gap-1 justify-content-between align-items-center bg-white">
            <div>
              <h4 className="fs-7 fw-bolder mb-1">
                <Link className="nav-link">Cameras & videos</Link>
              </h4>
              <p className="fs-9 text-muted">5 Items</p>
            </div>
            <img src="images/camera.jpg" alt="camera" />
          </div>
          <div className="category p-3 shadow-sm d-flex gap-1 justify-content-between align-items-center bg-white">
            <div>
              <h4 className="fs-7 fw-bolder mb-1">
                <Link className="nav-link">Smart Television</Link>
              </h4>
              <p className="fs-9 text-muted">10 Items</p>
            </div>
            <img src="images/tv.jpg" alt="camera" />
          </div>
          <div className="category p-3 shadow-sm d-flex gap-1 justify-content-between align-items-center bg-white">
            <div>
              <h4 className="fs-7 fw-bolder mb-1">
                <Link className="nav-link">Smart Watches</Link>
              </h4>
              <p className="fs-9 text-muted">10 Items</p>
            </div>
            <img src="images/headphone.jpg" alt="camera" />
          </div>
          <div className="category p-3 shadow-sm d-flex gap-1 justify-content-between align-items-center bg-white">
            <div>
              <h4 className="fs-7 fw-bolder mb-1">
                <Link className="nav-link">Music & Gaming</Link>
              </h4>
              <p className="fs-9 text-muted">10 Items</p>
            </div>
            <img src="images/camera.jpg" alt="camera" />
          </div>
          <div className="category p-3 shadow-sm d-flex gap-1 justify-content-between align-items-center bg-white">
            <div>
              <h4 className="fs-7 fw-bolder mb-1">
                <Link className="nav-link">Cameras & videos</Link>
              </h4>
              <p className="fs-9 text-muted">10 Items</p>
            </div>
            <img src="images/camera.jpg" alt="camera" />
          </div>
          <div className="category p-3 shadow-sm d-flex gap-1 justify-content-between align-items-center bg-white">
            <div>
              <h4 className="fs-7 fw-bolder mb-1">
                <Link className="nav-link">Smart Television</Link>
              </h4>
              <p className="fs-9 text-muted">10 Items</p>
            </div>
            <img src="images/tv.jpg" alt="camera" />
          </div>
          <div className="category p-3 shadow-sm d-flex gap-1 justify-content-between align-items-center bg-white">
            <div>
              <h4 className="fs-7 fw-bolder mb-1">
                <Link className="nav-link">Smart Watches</Link>
              </h4>
              <p className="fs-9 text-muted">10 Items</p>
            </div>
            <img src="images/headphone.jpg" alt="camera" />
          </div>
          <div className="category p-3 shadow-sm d-flex gap-1 justify-content-between align-items-center bg-white">
            <div>
              <h4 className="fs-7 fw-bolder mb-1">
                <Link className="nav-link">Smart Television</Link>
              </h4>
              <p className="fs-9 text-muted">10 Items</p>
            </div>
            <img src="images/tv.jpg" alt="camera" />
          </div>
          <div className="category p-3 shadow-sm d-flex gap-1 justify-content-between align-items-center bg-white">
            <div>
              <h4 className="fs-7 fw-bolder mb-1">
                <Link className="nav-link">Smart Watches</Link>
              </h4>
              <p className="fs-9 text-muted">10 Items</p>
            </div>
            <img src="images/headphone.jpg" alt="camera" />
          </div>
        </div>
      </Section>
      <FeatureCollection />
      {/* <Section className="home-wrapper-5">
        <div className="row">
          <div className="col-6 col-lg-4 col-xl-3 p-2">
            <div className="h-100 famous-card card justify-content-between bg-dark position-relative border-0 shadow-sm overflow-hidden">
              <div className="famous-content px-3 py-4">
                <h6 className="text-white-50 fs-7">Big Screen</h6>
                <h5 className="fs-4 fw-bolder text-white">
                  <Link className="nav-link">Smart Watch Series 7</Link>
                </h5>
                <p className="text-white-50 fs-8">
                  From $399or $16.62/mo. for 24 mo.*
                </p>
              </div>
              <img src="images/tab1.jpg" className="img-fluid" alt="famous" />
            </div>
          </div>
          <div className="col-6 col-lg-4 col-xl-3 p-2">
            <div className="h-100 famous-card card justify-content-between bg-white position-relative border-0 shadow-sm overflow-hidden">
              <div className="famous-content px-3 py-4">
                <h6 className="text-muted fs-7">Studio Display</h6>
                <h5 className="fs-4 fw-bolder text-dark">
                  <Link className="nav-link">600 nits of brightness.</Link>
                </h5>
                <p className="text-muted fs-8">27-inch 5K Retina display</p>
              </div>
              <img src="images/tab1.jpg" className="img-fluid" alt="famous" />
            </div>
          </div>
          <div className="col-6 col-lg-4 col-xl-3 p-2">
            <div className="h-100 famous-card card justify-content-between bg-white position-relative border-0 shadow-sm overflow-hidden">
              <div className="famous-content px-3 py-4">
                <h5 className="text-muted fs-7">smartphones</h5>
                <h6 className="fs-4 fw-bolder text-dark">
                  <Link className="nav-link">Smartphone 13 Pro.</Link>
                </h6>
                <p className="text-muted fs-8">
                  Now in Green. From $999.00 or $41.62/mo. for 24 mo. Footnote*
                </p>
              </div>
              <img src="images/tab1.jpg" className="img-fluid" alt="famous" />
            </div>
          </div>
          <div className="col-6 col-lg-4 col-xl-3 p-2">
            <div className="h-100 famous-card card justify-content-between bg-white position-relative border-0 shadow-sm overflow-hidden">
              <div className="famous-content px-3 py-4">
                <h6 className="text-muted fs-7">home speakers</h6>
                <h5 className="fs-4 fw-bolder text-dark">
                  <Link className="nav-link">Room-filling sound.</Link>
                </h5>
                <p className="text-muted fs-8">
                  From $699 or $116.58/mo. for 12 mo.*
                </p>
              </div>
              <img src="images/tab1.jpg" className="img-fluid" alt="famous" />
            </div>
          </div>
        </div>
      </Section> */}
      {/* <OurPopularProduct /> */}
      <Section className="brands home-wrapper-7">
        <div className="row align-item-center justify-content-center justify-content-lg-between p-3 gap-3 bg-white rounded-3 shadow-sm">
          <img
            src="images/brand-01.png"
            alt=""
            className="shadow-sm d-inline-block"
          />
          <img
            src="images/brand-02.png"
            alt=""
            className="shadow-sm d-inline-block"
          />
          <img
            src="images/brand-03.png"
            alt=""
            className="shadow-sm d-inline-block"
          />
          <img
            src="images/brand-04.png"
            alt=""
            className="shadow-sm d-inline-block"
          />
          <img
            src="images/brand-05.png"
            alt=""
            className="shadow-sm d-inline-block"
          />
          <img
            src="images/brand-06.png"
            alt=""
            className="shadow-sm d-inline-block"
          />
          <img
            src="images/brand-07.png"
            alt=""
            className="shadow-sm d-inline-block"
          />
        </div>
      </Section>
    </div>
  );
};

export default Home;
