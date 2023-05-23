import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/App.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <App />
  </Provider>
  // </React.StrictMode>
);
