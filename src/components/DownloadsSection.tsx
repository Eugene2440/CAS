
import React from "react";
import { FileText, Download, FileDown } from "lucide-react";

interface DownloadItem {
  name: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const downloadItems: DownloadItem[] = [
  {
    name: "CSA Constitution",
    description: "Read about the organization's structure, rules, and governance",
    icon: <FileText className="h-12 w-12 text-csa-orange" />,
    link: "#" // placeholder link
  },
  {
    name: "Membership Form",
    description: "Fill this form to join CSA or renew your membership",
    icon: <FileText className="h-12 w-12 text-csa-orange" />,
    link: "#" // placeholder link
  },
  {
    name: "Registered Members",
    description: "View the list of registered CSA members",
    icon: <FileText className="h-12 w-12 text-csa-orange" />,
    link: "https://docs.google.com/spreadsheets/d/1uv-bzwCwdYdiQJrbUWHcXRaitku8E3oEmXGt2FwUvZs/edit?gid=963869128#gid=963869128"
  }
];

const DownloadsSection = () => {
  return (
    <section id="downloads" className="py-16 md:py-24 bg-white">
      <div className="csa-container">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2 className="section-title text-center after:left-1/2 after:-translate-x-1/2 text-slide-in" style={{ animationDelay: "0.1s" }}>
            Downloads
          </h2>
          <p className="text-lg text-csa-gray mt-6 text-fade-in" style={{ animationDelay: "0.3s" }}>
            Access important CSA documents, forms, and resources
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {downloadItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center animate-on-scroll"
              style={{ animationDelay: `${0.5 + index * 0.2}s` }}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-csa-navy mb-2">{item.name}</h3>
              <p className="text-csa-gray mb-6">{item.description}</p>
              <a 
                href={item.link} 
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto bg-csa-navy text-white px-6 py-3 rounded-md font-medium transition-all duration-300 inline-flex items-center group hover:bg-csa-orange transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <FileDown className="mr-2 h-5 w-5 animate-bounce" />
                Download Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DownloadsSection;
