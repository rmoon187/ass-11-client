import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { useEffect, useState, useRef } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SliderB = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchSlides = async () => {
      try {
        const response = await fetch("/slider.json", {
          signal: controller.signal
        });
        
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        
        const data = await response.json();
        setSlides(data.slice(0, 5)); // Limit to 5 slides for performance
        setLoading(false);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchSlides();
    
    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="h-[300px] md:h-[400px] lg:h-[700px] bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"></div>
    );
  }

  if (error || slides.length === 0) {
    return (
      <div className="h-[300px] md:h-[400px] lg:h-[700px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
        <div className="text-center p-4">
          <p className="text-red-500 dark:text-red-400">{error || "No slides available"}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        loop={slides.length > 1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }}
        pagination={{ 
          clickable: true, 
          dynamicBullets: true,
          dynamicMainBullets: 3
        }}
        speed={800}
        grabCursor
        className="h-[300px] md:h-[400px] lg:h-[700px]"
        preloadImages={false}
        lazy={true}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="!h-full">
            <div className="relative w-full h-full">
              <img
                src={slide.img}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width="1200"
                height="700"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-md">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {slide.title}
                </h2>
                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {slide.details?.slice(0, 3).map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-prev !hidden md:!flex !text-white !bg-black/30 hover:!bg-black/50 !w-10 !h-10 rounded-full after:!text-sm"></div>
      <div className="swiper-button-next !hidden md:!flex !text-white !bg-black/30 hover:!bg-black/50 !w-10 !h-10 rounded-full after:!text-sm"></div>
    </div>
  );
};

export default SliderB;