import { useEffect, useState } from "react";
import axios from "axios"; // Add Axios import
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
import ScrollAndScripts from "./Components/ScrollAndScripts";
import AddTestimonial from "./Pages/Testimonials";

const App = () => {
  const [initialized, setInitialized] = useState(false);

  // ------------------------
  // Apply theme dynamically
  // ------------------------
  const applyThemeToRoot = (themeObj) => {
    const root = document.documentElement;
    Object.entries(themeObj).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });
  };

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${API}/api/tatto/theme`);
        applyThemeToRoot(res.data);
      } catch (err) {
        console.error("Error fetching theme data", err);
      }
    };

    fetchTheme();
  }, []);

  // ------------------------
  // Existing initialization
  // ------------------------
  useEffect(() => {
    const isFirstLoad = !localStorage.getItem("app_initialized");
    if (isFirstLoad) {
      localStorage.setItem("app_initialized", "true");
    }

    if (typeof window.initPageScripts === "function") {
      setTimeout(
        () => {
          window.initPageScripts(window.location.pathname);
          setInitialized(true);
        },
        isFirstLoad ? 300 : 100
      );
    } else {
      setInitialized(true);
    }

    return () => {};
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/js/custom.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
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
        <Route path="/testimonials" element={<AddTestimonial />} />
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
