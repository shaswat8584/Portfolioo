import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import ContactCard from "./components/contact/ContactCard";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ShaderBackground from "./components/ShaderBackground";
import Hero from "./components/hero/Hero";

function App() {
  useEffect(() => {
    // Initialize Lenis smooth inertia scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
    });

    window.__lenis = lenis;

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    // Smoothly intercept and scroll anchor links across the entire site
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        const hash = anchor.getAttribute("href");
        if (hash && hash !== "#") {
          const targetElement = document.querySelector(hash);
          if (targetElement) {
            e.preventDefault();
            lenis.scrollTo(targetElement, { offset: 0, duration: 1.2 });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
  return (
    <main className="min-h-screen bg-[#171717] p-4">
      <div
        className="
          relative
          min-h-[calc(100vh-2rem)]
          overflow-hidden
          rounded-[32px]
          border
          border-black/30
          bg-[#080808]
        "
      >
        {/* WebGL Background */}
        <ShaderBackground />

        {/* Website Content */}
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <ContactCard />
          <Footer />
        </div>
      </div>
    </main>
  );
}

export default App;
