
import React from "react";
import { Mail, Phone, Facebook, Instagram, Linkedin, Twitter, Youtube, MapPin, ExternalLink } from "lucide-react";

// Custom TikTok icon since it's not available in lucide-react
const TiktokIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="lucide lucide-tiktok"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
  </svg>
);

const Footer = () => {
  const professionalBodies = [
    { name: "ACMK", url: "https://register.acmk.co.ke/student-registration/", logo: "/lovable-uploads/4facb8e7-ab4d-43e7-877d-162fa2cda016.png" },
    { name: "IQSK", url: "https://iqskenya.org/registered/register", logo: "/lovable-uploads/0ed2930b-a0d5-4f26-9df4-05e5ee77d4bd.png" },
    { name: "RICS", url: "https://www.rics.org/join-rics", logo: "/lovable-uploads/7bdab951-fc9c-4a71-a99a-612774a1df87.png" },
    { name: "KGBS", url: "https://www.kgbs.co.ke/join-us/", logo: "/lovable-uploads/f0935371-9077-4296-b2d1-da52b28567ea.png" },
    { name: "AAK", url: "https://aak.or.ke/how-to-join/", logo: "/lovable-uploads/10e04eab-0d56-4ce4-a367-fd86076de9c8.png" },
    { name: "BORAQS", url: "https://boraqs.or.ke/registration/", logo: "/lovable-uploads/b520b13b-f2a4-435a-ac71-1546e2f18d1a.png" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/csatukenya", description: "Connect with us for updates and events" },
    { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/csa_tuk/", description: "Explore our journey in pictures" },
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/company/csatuk/?viewAsMember=true", description: "Network professionally" },
    { name: "Twitter", icon: Twitter, url: "https://x.com/csa_tuk", description: "Follow CSA updates" },
    { name: "YouTube", icon: Youtube, url: "https://www.youtube.com/@CSA-TUK", description: "Watch our video content" },
    { name: "TikTok", icon: TiktokIcon, url: "https://www.tiktok.com/search?q=csa-tuk&t=1744310440871", description: "See CSA in action" },
  ];

  const quickLinks = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "#about" },
    { name: "Executive Council", url: "#executive" },
    { name: "Chapters", url: "#chapters" },
    { name: "Membership", url: "#membership" },
    { name: "Downloads", url: "#downloads" },
    { name: "Contact Us", url: "#contact" },
  ];
  
  return (
    <footer className="bg-csa-navy text-white">
      <div className="pt-16 pb-8 bg-csa-navy">
        <div className="csa-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About CSA */}
            <div className="text-bounce-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center mb-4">
                <img 
                  src="/lovable-uploads/c8c68b22-285b-430f-a653-19099c309574.png" 
                  alt="CSA-TUK Logo" 
                  className="h-10 w-10 mr-2"
                />
                <h3 className="text-lg font-bold">CSA-TUK</h3>
              </div>
              <p className="text-gray-300 mb-6 text-sm">
                The Construction Students Association at the Technical University of Kenya unites students 
                in construction-related fields to foster academic growth, professional development, and networking.
              </p>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-csa-orange transition-colors duration-300 hover:scale-110 transform"
                    aria-label={`Visit our ${social.name} page`}
                    title={social.description}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-fade-in" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index} className="transform transition-transform duration-300 hover:translate-x-2">
                    <a 
                      href={link.url} 
                      className="text-gray-300 hover:text-csa-orange transition-colors text-sm flex items-center"
                    >
                      <span className="h-1.5 w-1.5 bg-csa-orange rounded-full mr-2"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div className="text-fade-in" style={{ animationDelay: "0.5s" }}>
              <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start hover-scale">
                  <Mail className="h-5 w-5 mr-3 mt-0.5 text-csa-orange" />
                  <div>
                    <a 
                      href="mailto:csa@students.tukenya.ac.ke" 
                      className="text-gray-300 hover:text-csa-orange transition-colors text-sm"
                    >
                      csa@students.tukenya.ac.ke
                    </a>
                  </div>
                </li>
                <li className="flex items-start hover-scale">
                  <Phone className="h-5 w-5 mr-3 mt-0.5 text-csa-orange" />
                  <div>
                    <a 
                      href="https://wa.me/254758647130" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-csa-orange transition-colors text-sm"
                    >
                      +254 758 647 130 (WhatsApp)
                    </a>
                    <br />
                    <a 
                      href="tel:+254704317047" 
                      className="text-gray-300 hover:text-csa-orange transition-colors text-sm"
                    >
                      +254 704 317 047 (Call)
                    </a>
                  </div>
                </li>
                <li className="flex items-start hover-scale">
                  <MapPin className="h-5 w-5 mr-3 mt-0.5 text-csa-orange" />
                  <span className="text-gray-300 text-sm">
                    TUK Q Block, Second Floor
                  </span>
                </li>
              </ul>
            </div>

            {/* Professional Bodies Links */}
            <div className="text-fade-in" style={{ animationDelay: "0.7s" }}>
              <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Professional Links</h3>
              <p className="text-gray-300 mb-4 text-sm">Connect with professional bodies:</p>
              <div className="grid grid-cols-3 gap-2">
                {professionalBodies.map((body, index) => (
                  <a
                    key={index}
                    href={body.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-csa-orange transition-colors text-sm flex items-center justify-center bg-black/20 px-3 py-1.5 rounded-full hover:bg-black/30"
                  >
                    {body.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6 bg-black/20">
        <div className="csa-container">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Construction Students Association - TUK. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              In partnership with <a href="https://tukenya.ac.ke/" target="_blank" rel="noopener noreferrer" className="text-csa-orange hover:underline inline-flex items-center">
                The Technical University of Kenya <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
