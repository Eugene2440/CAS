
import React, { useState, useEffect } from "react";
import { FileText, Download, FileDown } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface DownloadItem {
  id: string;
  name: string;
  description: string;
  url: string;
}

const DownloadsSection = () => {
  const [documents, setDocuments] = useState<DownloadItem[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const snapshot = await getDocs(collection(db, "documents"));
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DownloadItem));
      console.log("Fetched documents:", docs);
      setDocuments(docs);
    };
    fetchDocuments();
  }, []);
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
          {documents.map((item, index) => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4"><FileText className="h-12 w-12 text-csa-orange" /></div>
              <h3 className="text-xl font-semibold text-csa-navy mb-2">{item.name}</h3>
              <p className="text-csa-gray mb-6">{item.description}</p>
              <a 
                href={item.url} 
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
