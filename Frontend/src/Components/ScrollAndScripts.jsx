import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component that handles scrolling to top and reinitializing scripts on route change
 */
const ScrollAndScripts = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo(0, 0);
    
    // Clear any existing timeouts
    const timeouts = [];
    
    // Re-run custom JS with a slight delay to ensure DOM is updated
    timeouts.push(setTimeout(() => {
      console.log("Route changed to:", location.pathname);
      
      // Re-initialize background images
      const pageSection = document.querySelectorAll(".bg-img, section");
      pageSection.forEach((section) => {
        if (section.getAttribute("data-background")) {
          section.style.backgroundImage = `url(${section.getAttribute("data-background")})`;
        }
      });
      
      // Call the global initialization function if it exists
      if (typeof window.initPageScripts === 'function') {
        window.initPageScripts(location.pathname);
      }
    }, 100));
    
    // Add a second timeout with a longer delay as a fallback
    timeouts.push(setTimeout(() => {
      if (typeof window.initPageScripts === 'function') {
        console.log("Running second initialization for path:", location.pathname);
        window.initPageScripts(location.pathname);
      }
    }, 500));
    
    // Cleanup function to clear timeouts
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [location]);
  
  return null;
};

export default ScrollAndScripts;