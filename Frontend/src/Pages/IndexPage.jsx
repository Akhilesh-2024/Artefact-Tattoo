import { useEffect } from "react";
import About from "../Components/Main/About";
import AppointmentForm from "../Components/Main/AppointmentForm";
import Blog from "../Components/Main/Blog";
import Clients from "../Components/Main/Clients";
import HeroBanner from "../Components/Main/HeroBanner";
import HrSection from "../Components/Main/HrSection";
import Pricing from "../Components/Main/Pricing";
import Process from "../Components/Main/Process";
import PromoVideoTestimonials from "../Components/Main/PromoVideoTestimonials";
import Services from "../Components/Main/Services";
import Team from "../Components/Main/Team";

const IndexPage = () => {
  // Initialize scripts when component mounts
  useEffect(() => {
    
    // Force re-initialization of scripts specific to home page
    setTimeout(() => {
      if (typeof window.initPageScripts === 'function') {
        window.initPageScripts('/');
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
    <HeroBanner />
    <HrSection />
    <About />
    <HrSection />
    <Process />
    <AppointmentForm />
    <Team />
    <HrSection />
    <Services />
    <Pricing />
    <Blog />
    <PromoVideoTestimonials />
    <Clients />
    </>
  );
};

export default IndexPage;
