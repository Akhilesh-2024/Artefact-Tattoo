import { useEffect, useState } from 'react';
import Navbar from "./Components/Main/Navbar";
import AboutPage from "./Pages/About";
import IndexPage from "./Pages/IndexPage";
import NotFound from "./Pages/NotFound";
import TeamPage from "./Pages/TeamPage";
import TeamDetailsPage from "./Pages/TeamDetailsPage";
import ContactPage from "./Pages/ContactPage";
import ServicesPage from "./Pages/ServicesPage";
import ServicesDetailPage from "./Pages/ServicesDetailPage";
import PortfolioPage from "./Pages/PortfolioPage";
import BlogPage from "./Pages/BlogPage";
import PostPage from "./Pages/PostPage";
import PricingPage from "./Pages/PricingPage";
import FaqsPage from "./Pages/FaqsPage";
import AftercarePage from "./Pages/AftercarePage";
import ComingSoonPage from "./Pages/ComingSoonPage";
import Preloader from "./Components/Main/Preloader";
import Footer from "./Components/Main/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollAndScripts from './Components/ScrollAndScripts';

const App = () => {
  // State to track if the app has been initialized
  const [initialized, setInitialized] = useState(false);
  
  // Initialize scripts on first load
  useEffect(() => {
    // Set a flag in localStorage to track page refreshes
    const isFirstLoad = !localStorage.getItem('app_initialized');
    if (isFirstLoad) {
      localStorage.setItem('app_initialized', 'true');
    }
    
    // Call the global initialization function if it exists
    if (typeof window.initPageScripts === 'function') {
      // Add a slight delay for the first initialization
      setTimeout(() => {
        window.initPageScripts(window.location.pathname);
        setInitialized(true);
      }, isFirstLoad ? 300 : 100);
    } else {
      setInitialized(true);
    }
    
    // Cleanup function
    return () => {
      // Cleanup code if needed
    };
  }, []);

  return (
    <Router>
      <ScrollAndScripts />
      <Preloader />
      <Navbar />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services-page" element={<ServicesDetailPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/team-details" element={<TeamDetailsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faqs" element={<FaqsPage />} />
        <Route path="/aftercare" element={<AftercarePage />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
