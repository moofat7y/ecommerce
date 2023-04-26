import React from "react";

const LoadingBtn = ({
  label,
  bgcolor,
  textcolor,
  loading,
  extraClass,
  disabled,
}) => {
  return (
    <button
      className={`btn ${bgcolor} ${textcolor ? textcolor : ""} ${extraClass}`}
      disabled={loading || disabled ? true : false}
    >
      {loading ? (
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
      ) : (
        label
      )}
    </button>
  );
};

export default LoadingBtn;
