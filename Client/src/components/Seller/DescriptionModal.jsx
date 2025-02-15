import React, { forwardRef } from "react";

const DescriptionModal = forwardRef(({ show, onClose, description }, ref) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0  bg-opacity-90 flex justify-center items-center">
      <div ref={ref} className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>
          ✖
        </button>
        <h2 className="text-lg font-semibold mb-4">Product Description</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
});

export default DescriptionModal;
