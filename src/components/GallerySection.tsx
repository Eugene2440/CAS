
import React, { useState } from "react";
import { X } from "lucide-react";

// Placeholder gallery images
const galleryImages = [
  { src: "/placeholder.svg", alt: "CSA Event", category: "Events" },
  { src: "/placeholder.svg", alt: "Site Visit", category: "Site Visits" },
  { src: "/placeholder.svg", alt: "Team Building", category: "Events" },
  { src: "/placeholder.svg", alt: "Field Trip", category: "Site Visits" },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Events", "Site Visits"];
  
  const filteredImages = filter === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-csa-navy/10">
      <div className="csa-container">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="section-title text-center after:left-1/2 after:-translate-x-1/2 text-slide-in" style={{ animationDelay: "0.1s" }}>
            Gallery
          </h2>
          <p className="text-lg text-csa-gray mt-6 text-fade-in" style={{ animationDelay: "0.3s" }}>
            A vibrant collection of CSA memories, events, and site visits.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 text-fade-in" style={{ animationDelay: "0.5s" }}>
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                filter === category
                  ? "bg-csa-navy text-white"
                  : "bg-white text-csa-navy hover:bg-gray-100"
              }`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div 
              key={index} 
              className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer text-bounce-in"
              style={{ animationDelay: `${0.6 + 0.1 * index}s` }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="w-full h-full overflow-hidden group">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-4 font-medium">{image.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              <button 
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 rounded-full p-2 transition-colors duration-300"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                className="w-full h-auto max-h-[80vh] object-contain" 
              />
              <div className="text-white text-center mt-4">
                <p className="text-lg font-medium">{selectedImage.alt}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
