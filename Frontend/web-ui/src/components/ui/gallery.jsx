import React, { useState } from "react";

const Gallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="bg-white p-6 rounded-b-md shadow-md">
      
        <div className="flex overflow-x-auto">
          {images.map((image, index) => (
            <div key={index} className="flex-none mr-4">
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="cursor-pointer max-w-[300px] h-[184px]"
                onClick={() => setSelectedImage(image)}
              />
            </div>
          ))}
        </div>
        {selectedImage && (
            <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
            onClick={() => setSelectedImage(null)} // Đóng modal khi nhấp ra ngoài
            >
                <div className="relative"> 
                
                <img
                    src={selectedImage}
                    alt="Selected Image"
                    className="h-[50vh] object-contain "
                    onClick={(e) => e.stopPropagation()} 
                />
                <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 -2 bg-black rounded-full text-white "
                >
                    {"<"}
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 -2 bg-black rounded-full text-white "
                >
                    {">"}
                </button>
                <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-0 right-0 p-2 bg-black bg-opacity-25 "
                >
                    X
                </button>
                </div>

            </div>
        )}
      
    </div>
  );
};

export default Gallery;
