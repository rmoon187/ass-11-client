import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const OptimizedSwiper = ({ slides }) => {
  const [isMounted, setIsMounted] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleImageLoad = (e) => {
    e.target.style.opacity = 1;
  };

  if (!isMounted || !slides?.length) return null;

  return (
    <div className="w-full relative">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        speed={1000}
        watchSlidesProgress
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={`slide-${index}`}>
            <div className="relative w-full h-[600px]">
              <img
                src={slide.image}
                alt={slide.alt || `Slide ${index + 1}`}
                loading="lazy"
                onLoad={handleImageLoad}
                className="w-full h-full object-cover opacity-0 transition-opacity duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>

              {/* Text Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4">
                {slide.title && (
                  <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4 animate-fadeInUp">
                    {slide.title}
                  </h2>
                )}
                {slide.description && (
                  <p className="text-lg md:text-xl text-white/90 max-w-2xl animate-fadeInUp delay-200">
                    {slide.description}
                  </p>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Optional: Custom CSS Animations */}
      <style jsx>{`
        .animate-fadeInUp {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 1s forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default OptimizedSwiper;
