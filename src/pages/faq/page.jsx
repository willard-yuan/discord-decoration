import { useEffect, useState } from "preact/hooks";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import Breadcrumb from "@/components/Breadcrumb.jsx";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  
  useEffect(() => {
    document.title = "FAQ - Discord Avatar Decorations";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Frequently asked questions about Discord avatar decorations. Learn how to create, customize, and use free Discord decorations.');
    }
    
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are Discord avatar decorations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Discord avatar decorations are visual enhancements that appear around your profile picture. They add frames, effects, or animated elements to make your avatar stand out in servers and direct messages."
          }
        },
        {
          "@type": "Question",
          "name": "Are these decorations really free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Our Discord decoration generator is completely free to use. You don't need Discord Nitro or any paid subscription to create and download custom decorations for your profile."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need Discord Nitro to use these decorations?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, you don't need Discord Nitro! Our tool creates decorations that are embedded directly into your avatar image, so they work with any Discord account type."
          }
        }
      ]
    };
    
    // Remove existing structured data script if any
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      // Cleanup structured data on unmount
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);
  
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What are Discord avatar decorations?",
      answer: "Discord avatar decorations are visual enhancements that appear around your profile picture. They add frames, effects, or animated elements to make your avatar stand out in servers and direct messages."
    },
    {
      question: "Are these decorations really free?",
      answer: "Yes! Our Discord decoration generator is completely free to use. You don't need Discord Nitro or any paid subscription to create and download custom decorations for your profile."
    },
    {
      question: "How do I apply decorations to my Discord avatar?",
      answer: "After creating your decoration, download the generated image and set it as your Discord profile picture. The decoration will be embedded directly into your avatar image."
    },
    {
      question: "Do I need Discord Nitro to use these decorations?",
      answer: "No, you don't need Discord Nitro! Our tool creates decorations that are embedded directly into your avatar image, so they work with any Discord account type."
    },
    {
      question: "Can I customize the decoration colors and styles?",
      answer: "Absolutely! Our decoration generator offers various customization options including different frames, colors, effects, and animation styles to match your personal preference."
    },
    {
      question: "Will the decorations work on mobile Discord?",
      answer: "Yes, since the decorations are embedded into your avatar image, they will display correctly on all Discord platforms including mobile apps, desktop, and web versions."
    },
    {
      question: "How many decorations can I create?",
      answer: "There's no limit! You can create as many different decorations as you want. Feel free to experiment with different styles and change your decorated avatar whenever you like."
    },
    {
      question: "Are the decorations animated?",
      answer: "We offer both static and animated decoration options. Animated decorations will loop continuously and add dynamic visual effects to your Discord profile."
    },
    {
      question: "Can I use my own images for decorations?",
      answer: "Currently, our tool provides a curated selection of high-quality decoration templates. We're working on adding custom image upload functionality in future updates."
    },
    {
      question: "Is there a size limit for avatar images?",
      answer: "Discord requires profile pictures to be under 8MB and at least 128x128 pixels. Our tool automatically optimizes your decorated avatar to meet Discord's requirements while maintaining quality."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-lower via-base-lower to-accent-primary/5">
      <Navbar />
      <Breadcrumb />
      
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/10 to-transparent">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,119,198,0.1),transparent_50%)]" />
        </div>
        
        <main className="relative container mx-auto px-4 py-16 max-w-4xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-accent-primary/10 rounded-full text-accent-primary text-sm font-medium mb-6 backdrop-blur-sm border border-accent-primary/20">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Help Center
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-text-primary via-accent-primary to-text-primary bg-clip-text text-transparent animate-pulse">
                Frequently Asked
              </span>
              <br />
              <span className="text-text-primary">Questions</span>
            </h1>
            
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about creating and using Discord avatar decorations.
              <br className="hidden md:block" />
              <span className="text-accent-primary font-medium">Get answers to common questions instantly.</span>
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`group bg-base-upper/80 backdrop-blur-sm rounded-xl border transition-all duration-300 hover:shadow-lg hover:shadow-accent-primary/10 ${
                  openIndex === index 
                    ? 'border-accent-primary/30 shadow-lg shadow-accent-primary/10' 
                    : 'border-border-primary hover:border-accent-primary/20'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-base-upper/50 rounded-xl transition-colors duration-200"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-text-primary group-hover:text-accent-primary transition-colors duration-200 pr-4">
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center transition-all duration-300 ${
                    openIndex === index ? 'rotate-180 bg-accent-primary/20' : 'group-hover:bg-accent-primary/20'
                  }`}>
                    <svg className="w-4 h-4 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-border-primary to-transparent mb-4" />
                    <p className="text-text-secondary leading-relaxed text-base md:text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-base-upper/80 to-base-upper/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-accent-primary/20 shadow-xl shadow-accent-primary/5">
              <div className="max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-gradient-to-r from-accent-primary to-accent-primary/80 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
                  Still have questions?
                </h2>
                
                <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                  Can't find what you're looking for? Return to our homepage to explore more features and create your custom Discord decorations.
                </p>
                
                <div className="flex justify-center">
                  <a 
                    href="/" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-primary/90 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent-primary/25 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}