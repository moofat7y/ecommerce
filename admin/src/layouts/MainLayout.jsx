import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../components/dashboard/Header";
import { RxDashboard } from "react-icons/rx";
import { IoPersonOutline } from "react-icons/io5";
import { FaOpencart } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GoChecklist, GoTasklist } from "react-icons/go";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import {
  getDashboardDetails,
  getOrdersInEachMonth,
} from "../features/dashboard/dashboardSlice";
import LogoutBtn from "../components/auth/LogoutBtn";

const MainLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersInEachMonth());
    dispatch(getDashboardDetails());
  }, []);

  return (
    <>
      <Header />
      <div className="container-fluid px-0">
        <main className="w-100 row m-0">
          <nav className="col-2 bg-light py-1 px-1">
            <ul className="navbar-nav h-100">
              <li className="nav-item mb-1">
                <NavLink
                  to="/dashboard"
                  end
                  className="nav-link px-3 d-flex align-items-center text-dark rounded-3"
                >
                  <RxDashboard className="me-2 fs-5" />
                  <span className="fs-7">Dashboard</span>
                </NavLink>
              </li>

              <li className="nav-item mb-1">
                <NavLink
                  to="/dashboard/customers"
                  end
                  className="nav-link px-3 d-flex align-items-center text-dark rounded-3"
                >
                  <IoPersonOutline className="me-2 fs-5" />
                  <span className="fs-7">Customers</span>
                </NavLink>
              </li>

              <li className="nav-item mb-1">
                <button
                  className="nav-link collapsed w-100 py-2 px-3 d-flex align-items-center text-dark rounded-3 navbar-toggler"
                  data-bs-toggle="collapse"
                  data-bs-target="#navdrop1"
                >
                  <FaOpencart className="me-2 fs-5" />
                  <span className="fs-7">Catalog</span>
                  <MdKeyboardArrowRight className="fs-5 ms-auto arrow" />
                </button>
                <div className="navbar-collapse collapse" id="navdrop1">
                  <ul className="navbar-nav h-100">
                    <li className="nav-item mb-1">
                      <NavLink
                        to="/dashboard/catalog/add-product"
                        className="nav-link py-1 ps-5 d-flex align-items-center text-dark rounded-3"
                      >
                        <span className="fs-8">Add Product</span>
                      </NavLink>
                    </li>

                    <li className="nav-item mb-1">
                      <NavLink
                        to="product-list"
                        className="nav-link py-1 ps-5 d-flex align-items-center text-dark rounded-3"
                      >
                        <span className="fs-8">Product List</span>
                      </NavLink>
                    </li>

                    <li className="nav-item mb-1">
                      <NavLink
                        to="/dashboard/brand-list"
                        className="nav-link py-1 ps-5 d-flex align-items-center text-dark rounded-3"
                      >
                        <span className="fs-8">Brand List</span>
                      </NavLink>
                    </li>

                    <li className="nav-item mb-1">
                      <NavLink
                        to="/dashboard/product/category-list"
                        className="nav-link py-1 ps-5 d-flex align-items-center text-dark rounded-3"
                      >
                        <span className="fs-8">Category List</span>
                      </NavLink>
                    </li>

                    <li className="nav-item mb-0">
                      <NavLink
                        to="/dashboard/color-list"
                        className="nav-link py-1 ps-5 d-flex align-items-center text-dark rounded-3"
                      >
                        <span className="fs-8">Color List</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item mb-1">
                <NavLink
                  to="/dashboard/orders"
                  className="nav-link px-3 d-flex align-items-center text-dark rounded-3"
                >
                  <GoChecklist className="me-2 fs-5" />
                  <span className="fs-7">Orders</span>
                </NavLink>
              </li>

              <li className="nav-item mb-1">
                <NavLink
                  to="/dashboard/enquires"
                  className="nav-link px-3 d-flex align-items-center text-dark rounded-3"
                >
                  <GoTasklist className="me-2 fs-5" />
                  <span className="fs-7">Enquires</span>
                </NavLink>
              </li>
              <li className="nav-item mt-auto">
                <LogoutBtn />
              </li>
            </ul>
          </nav>
          <section className="col-10 py-4 px-5 bg-white">
            <Outlet />
          </section>
        </main>
      </div>
    </>
  );
};

export default MainLayout;
