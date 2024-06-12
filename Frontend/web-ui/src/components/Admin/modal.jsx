import React from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md transform rounded-lg bg-white p-6 shadow-lg transition-all sm:w-full sm:max-w-lg">
                <button
                    onClick={onClose}
                    className="absolute right-0 top-0 mr-2 mt-2 text-gray-500 hover:text-gray-800"
                >
                    <FaTimes className="h-6 w-6" />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
