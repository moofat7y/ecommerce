import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
const FiltersModal = ({ children, closeModal, section }) => {
  const modalRef = useRef();

  const handleBgClick = (e) => {
    if (modalRef.current.contains(e.target)) {
      return;
    } else {
      closeModal();
    }
  };

  useEffect(() => {
    if (section) {
      const sec = document.getElementsByClassName(section);

      sec[0].scrollIntoView({ behavior: "smooth" });
      sec[0].classList.add("glow");
      setTimeout(() => {
        sec[0].classList.remove("glow");
      }, [500]);
    }
  }, [section]);
  return ReactDOM.createPortal(
    <>
      <div
        onClick={(e) => {
          handleBgClick(e);
        }}
        className="position-fixed w-100 h-100 top-0 start-0 bottom--"
        style={{ backgroundColor: "#0000004a", zIndex: 10000 }}
      >
        <div
          ref={modalRef}
          className="custom-modal bg-white  position-absolute bottom-0 start-0 rounded-3 w-100"
        >
          <div className="cutom-modal-header px-2 d-flex py-2 shadow-sm">
            <button onClick={closeModal} className="btn btn-light me-auto">
              اغلاق
            </button>
          </div>

          <div className="custom-modal-body py-3">{children}</div>
        </div>
      </div>
    </>,
    document.getElementById("portal-root")
  );
};

export default FiltersModal;
