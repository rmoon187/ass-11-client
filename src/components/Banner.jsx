import { motion, useScroll, useTransform } from "framer-motion";
import { NavLink } from "react-router-dom";
import bannerImage from "../assets/banner.jpg";
import { useTheme } from "../provider/ThemeProvider";
import { useRef, useState, useEffect } from "react";

const Banner = () => {
  const { isDarkMode } = useTheme();
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Smoother parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "15%" : "30%"]);

  return (
    <div 
      ref={ref}
      className="relative h-[180px] xs:h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] overflow-hidden pt-16"
    >
      <motion.div
        style={{ y }}
        className="w-full h-full"
      >
        <motion.img
          src={bannerImage}
          alt="Banner"
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 ${
          isDarkMode ? "bg-black bg-opacity-60" : "bg-black bg-opacity-50"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.5,
            type: "spring",
            damping: 10,
            stiffness: 100
          }}
          className="w-full px-2 sm:px-4"
        >
          <h1 className="text-white text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 xs:mb-2 sm:mb-3 md:mb-4">
            Discover the Best Products
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.7,
            type: "spring",
            damping: 10,
            stiffness: 100
          }}
          className="w-full px-4 sm:px-6 max-w-2xl mx-auto"
        >
          <p className="text-white text-sm xs:text-base sm:text-lg md:text-xl mb-2 xs:mb-3 sm:mb-4 md:mb-6">
            Get personalized recommendations and share your insights with the
            community.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.9,
            type: "spring",
            damping: 10,
            stiffness: 100
          }}
        >
          <NavLink
            to="/allQueries"
            className={`px-4 py-2 xs:px-5 xs:py-2.5 sm:px-6 sm:py-3 rounded-md text-sm xs:text-base sm:text-lg font-semibold transition-colors shadow-lg ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-white hover:bg-green-600 hover:text-white text-green-600"
            }`}
          >
            Explore Now
          </NavLink>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Banner;