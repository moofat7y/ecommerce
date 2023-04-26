import { toast } from "react-toastify";

export const notifySuccess = (message) => {
  toast.success(message, {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    rtl: true,
    progress: undefined,
    theme: "light",
  });
};

export const notifyWarning = (message) => {
  toast.warning(message, {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    rtl: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const notifyError = (message) => {
  toast.error(message, {
    position: "top-left",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    rtl: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
