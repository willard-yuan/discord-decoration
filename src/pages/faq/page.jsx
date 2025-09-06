import { useEffect } from "preact/hooks";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";

export default function FAQ() {
  useEffect(() => {
    document.title = "FAQ - Discord Avatar Decorations";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Frequently asked questions about Discord avatar decorations. Learn how to create, customize, and use free Discord decorations.');
    }
  }, []);

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
    <div className="min-h-screen bg-base-lower">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Everything you need to know about creating and using Discord avatar decorations
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-base-upper rounded-lg p-6 shadow-sm border border-border-primary">
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                {faq.question}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-base-upper rounded-lg p-8 border border-border-primary">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Still have questions?
            </h2>
            <p className="text-text-secondary mb-6">
              Can't find what you're looking for? Join our community discussion to get help from other users.
            </p>
            <a 
              href="/discuss" 
              className="inline-flex items-center px-6 py-3 bg-accent-primary text-white font-medium rounded-lg hover:bg-accent-primary/90 transition-colors"
            >
              Join Discussion
            </a>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}