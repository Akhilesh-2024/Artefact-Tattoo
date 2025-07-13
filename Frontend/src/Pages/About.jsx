import { useEffect } from "react";
import AboutHeroSection from "../Components/AboutHeroSection";
import About from "../Components/Main/About";
import HrSection from "../Components/Main/HrSection";
import Team from "../Components/Main/Team";
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Clients from "../Components/Main/Clients";

const AboutPage = () => {
  // Initialize scripts when component mounts
  useEffect(() => {
    
    // Force re-initialization of scripts specific to about page
    setTimeout(() => {
      if (typeof window.initPageScripts === 'function') {
        window.initPageScripts('/about');
      }
      
      // Ensure background images are loaded
      if (window.jQuery) {
        const $ = window.jQuery;
        $(".bg-img, section").each(function() {
          if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
          }
        });
      }
    }, 200);
    
    // Cleanup function
    return () => {
    };
  }, []);
  
  return (
    <>
      <AboutHeroSection />
      <HrSection />
      <About />
      <Team />
      <PromoVideoTestimonials />
      <Clients />
    </>
  )
}

export default AboutPage