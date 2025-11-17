import React, { useState } from 'react';
import { Handshake, Send } from 'lucide-react';

const PartnerSection = () => {
  const [showPartnerForm, setShowPartnerForm] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const name = formData.get('name') as string;
    const organization = formData.get('organization') as string;
    const email = formData.get('email') as string;
    
    const emailBody = 
      `Dear CSA Executive Council,%0A%0A` +
      `I hope this message finds you well.%0A%0A` +
      `I am reaching out on behalf of ${organization} to express our interest in partnering with CSA.%0A%0A` +
      `Name: ${name}%0A` +
      `Organization: ${organization}%0A` +
      `Email: ${email}%0A%0A` +
      `We would be delighted to explore potential areas of collaboration and look forward to discussing how we can work together.%0A%0A` +
      `Warm regards,%0A` +
      `${name}`;
    
    const mailtoLink = `mailto:csa@students.tukenya.ac.ke?subject=${encodeURIComponent("Partnership Proposal")}&body=${emailBody}`;
    
    window.location.href = mailtoLink;
    
    form.reset();
    setShowPartnerForm(false);
  };
  
  return (
    <section id="partner" className="py-16 md:py-24 bg-white text-csa-navy">
      <div className="csa-container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title text-csa-navy after:left-1/2 after:-translate-x-1/2 text-slide-in" style={{ animationDelay: "0.1s" }}>
            Partner with CSA-TUK
          </h2>
          <p className="text-xl text-gray-200 mt-6 font-semibold text-fade-in" style={{ animationDelay: "0.3s" }}>
            Together, we can empower the next generation of construction professionals.
          </p>
          <p className="text-lg text-gray-300 mt-4 text-fade-in" style={{ animationDelay: "0.5s" }}>
            We welcome partnerships with industry players, professional bodies, and educational institutions to enhance the learning experience of our students and create meaningful impact in the construction industry.
          </p>
          
          <button 
            onClick={() => setShowPartnerForm(true)}
            className="mt-10 btn-outline border-csa-navy text-csa-navy hover:bg-csa-navy inline-flex items-center text-bounce-in"
            style={{ animationDelay: "0.7s" }}
          >
            <Handshake className="mr-2 h-5 w-5" />
            Become a Partner
          </button>
        </div>
        
        {showPartnerForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl text-csa-navy">
              <h3 className="text-xl font-bold mb-4">Partnership Proposal</h3>
              <p className="mb-4 text-csa-gray">Fill in your details to express interest in partnering with CSA-TUK.</p>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-csa-orange"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                    <input 
                      type="text" 
                      name="organization" 
                      required 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-csa-orange"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-csa-orange"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button 
                    type="button" 
                    onClick={() => setShowPartnerForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary inline-flex items-center"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Send Proposal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnerSection;
