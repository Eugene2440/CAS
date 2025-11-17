
import React, { useState } from 'react';
import { FileText, Send } from 'lucide-react';

const ArticlesSection = () => {
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const name = formData.get('name') as string;
    const course = formData.get('course') as string;
    const email = formData.get('email') as string;
    const title = formData.get('title') as string;
    
    // Format email body
    const emailBody = `Dear Chief Editor,

I hope this message finds you well.
I would like to submit an article for your review. Please find my details below, and the article is attached for your consideration:

Full Name: ${name}
Course: ${course}
Email Address: ${email}
Article Title: ${title}

I look forward to your feedback and the opportunity to contribute.

Best regards,
${name}`;
    
    // Create mailto link
    const mailtoLink = `mailto:csa@students.tukenya.ac.ke?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Reset form and close dialog
    form.reset();
    setShowSubmitForm(false);
  };
  
  return (
    <section id="articles" className="py-16 md:py-24 bg-gray-100">
      <div className="csa-container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-title after:left-1/2 after:-translate-x-1/2 text-slide-in" style={{ animationDelay: "0.1s" }}>
            Articles & News
          </h2>
          <p className="text-lg text-csa-gray mt-6 text-fade-in" style={{ animationDelay: "0.3s" }}>
            Stay updated with insights from CSA and the construction world.
          </p>
          
          <div className="mt-12 p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-bounce-in border-2 border-transparent hover:border-gray-200" style={{ animationDelay: "0.5s" }}>
            <h3 className="text-2xl font-semibold text-csa-navy mb-4">Coming Soon!</h3>
            <p className="mb-6">
              We're preparing articles on construction trends, industry updates, and student reflections.
            </p>
            <p className="text-csa-orange font-medium mb-8">
              Call for Writers: Want to share your story or insight? Submit your article below!
            </p>
            
            <button 
              onClick={() => setShowSubmitForm(true)}
              className="btn-secondary inline-flex items-center"
            >
              <FileText className="mr-2 h-5 w-5" />
              Submit an Article
            </button>
          </div>
        </div>
        
        {/* Submit Article Form Dialog */}
        {showSubmitForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
              <h3 className="text-xl font-bold text-csa-navy mb-4">Submit an Article</h3>
              <p className="mb-4 text-csa-gray">Have something to share? Fill in your details below to submit an article on construction-related themes.</p>
              
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                    <input 
                      type="text" 
                      name="course" 
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
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Article Title</label>
                    <input 
                      type="text" 
                      name="title" 
                      required 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-csa-orange"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button 
                    type="button" 
                    onClick={() => setShowSubmitForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn-primary inline-flex items-center"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Submit
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

export default ArticlesSection;
