import React from "react";
const Modal = ({ isOpen, closeModal, formData }) => {
  if (!isOpen) return null;
  return (
    isOpen && (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={closeModal}>
            &times;
          </button>
          <h3>Успешно зарегистрировано!</h3>
          <pre className="modal-json">{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </div>
    )
  );
};
export default Modal;
