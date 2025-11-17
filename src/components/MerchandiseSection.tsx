
import React from "react";
import { ShoppingBag, ExternalLink, BookOpen } from "lucide-react";

interface MerchandiseItem {
  name: string;
  image: string;
  description: string;
}

const merchandiseItems: MerchandiseItem[] = [
  { name: "T-shirts", image: "/placeholder.svg", description: "CSA branded t-shirts in various colors and sizes" },
  { name: "Hoodies", image: "/placeholder.svg", description: "Keep warm with CSA branded hoodies" },
  { name: "Caps", image: "/placeholder.svg", description: "Stylish CSA branded caps for all occasions" },
  { name: "Wristbands", image: "/placeholder.svg", description: "Show your CSA pride with our wristbands" },
  { name: "Flasks", image: "/placeholder.svg", description: "Stay hydrated with CSA branded flasks" },
  { name: "Helmets", image: "/placeholder.svg", description: "Safety first with our construction helmets" },
  { name: "Reflectors", image: "/placeholder.svg", description: "High-visibility CSA reflectors for construction sites" },
  { name: "Books", image: "/placeholder.svg", description: "A copy of 'The Abnormal Student' by Nashon Okowa" },
];

const MerchandiseSection = () => {
  return (
    <section id="merchandise" className="py-16 md:py-24 bg-csa-navy/90">
      <div className="csa-container">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="section-title text-white text-center after:left-1/2 after:-translate-x-1/2 text-slide-in" style={{ animationDelay: "0.1s" }}>
            CSA Merchandise
          </h2>
          <p className="text-lg text-white/90 mt-6 text-fade-in" style={{ animationDelay: "0.3s" }}>
            Show your pride as a member of the Construction Students Association by ordering our official merchandise.
            From branded clothing to useful construction tools, represent CSA with pride.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {merchandiseItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 text-bounce-in"
              style={{ animationDelay: `${0.5 + 0.1 * index}s` }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-csa-navy text-lg">{item.name}</h3>
                <p className="text-gray-600 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto text-center text-bounce-in" style={{ animationDelay: "1.3s" }}>
          <ShoppingBag className="h-12 w-12 text-csa-orange mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-csa-navy mb-2">Ready to Order?</h3>
          <p className="text-csa-gray mb-6">
            Order your CSA merchandise now and showcase your pride as a member of the Construction Students Association.
          </p>
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSe4T5V2_RrHaq6Fn55K5cUVWxK4r88GsVUMabulryGp3qcwLw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex glow-effect animate-pulse"
          >
            Order Now <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default MerchandiseSection;
