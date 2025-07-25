import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// Enhanced animation variants
const fadeInLeft = {
  hidden: { 
    opacity: 0, 
    x: -50,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { 
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
      staggerChildren: 0.2,
      when: "beforeChildren"
    } 
  },
};

const fadeInRight = {
  hidden: { 
    opacity: 0, 
    x: 50,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { 
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
      delay: 0.2
    } 
  },
};

const listItem = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "backOut"
    }
  }
};

const imageHover = {
  hover: {
    y: -5,
    transition: {
      y: {
        duration: 0.4,
        yoyo: Infinity,
        ease: "easeOut"
      }
    }
  }
};

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const API = import.meta.env.VITE_API_URL;
        const res = await axios.get(`${API}/api/tatto/about`);
        setAboutData(res.data);
      } catch (err) {
        console.error("Error fetching about data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return (
      <section className="about section-padding">
        <div className="container text-center">
          <motion.h3
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Loading About Section...
          </motion.h3>
        </div>
      </section>
    );
  }

  if (!aboutData) return null;

  return (
    <section className="about section-padding">
      <div className="container">
        <div className="row">
          <motion.div
            className="col-md-7"
            variants={fadeInLeft}
            initial="hidden"
            animate={hasAnimated ? "visible" : "hidden"}
            whileInView={() => {
              if (!hasAnimated) setHasAnimated(true);
              return "visible";
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Established in {aboutData.established || "Established"}
            </motion.div>
            
            <motion.div 
              className="section-title white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {aboutData.title} <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >{aboutData.subTitle}</motion.span>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {aboutData.description}
            </motion.p>

            <motion.ul 
              className="about-list list-unstyled"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {(aboutData.points || []).map((point, index) => (
                <motion.li 
                  key={index}
                  variants={listItem}
                  whileHover={{ 
                    x: 5,
                    transition: { duration: 0.2 } 
                  }}
                >
                  <div className="about-list-icon">
                    <motion.span 
                      className="ti-check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                        delay: 0.2 + (index * 0.1)
                      }}
                    />
                  </div>
                  <div className="about-list-text">
                    <p>{point}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            className="col-md-5 mt-30"
            variants={fadeInRight}
            initial="hidden"
            animate={hasAnimated ? "visible" : "hidden"}
            whileInView={() => {
              if (!hasAnimated) setHasAnimated(true);
              return "visible";
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              whileHover="hover"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: 0.8,
                type: "spring",
                stiffness: 100
              }}
            >
              <motion.img
                src={`${import.meta.env.VITE_API_URL}${aboutData.img}`}
                alt="About"
                variants={imageHover}
                style={{
                  borderRadius: '10px',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
                }}
                whileTap={{ scale: 0.95 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;