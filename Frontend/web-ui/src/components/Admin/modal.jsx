import React from "react";
import { XIcon } from "@heroicons/react/solid";

const Modal = ({ onClose, children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute right-0 top-0 mr-2 mt-2 text-gray-500 hover:text-gray-800"
                >
                    <XIcon className="h-6 w-6" />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
