/* eslint-disable react/prop-types */
import {
    A11y,
    Autoplay,
    Navigation,
    Pagination,
    Scrollbar,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
import SwiperCore from 'swiper';

// Initialize Swiper modules
SwiperCore.use([Autoplay, Navigation, Pagination, Scrollbar, A11y]);

const SliderB = () => {
    const [slide, setSlide] = useState([]);
    const [swiperInitialized, setSwiperInitialized] = useState(false);

    useEffect(() => {
        fetch("/slider.json")
            .then(res => res.json())
            .then(data => setSlide(data))
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    const shouldLoop = slide.length >= 3;

    return (
        <div className="relative">
            <Swiper
                className="h-[300px] md:h-[400px] lg:h-[700px] object-cover"
                modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
                // autoplay={{
                //     delay: 3000,
                //     disableOnInteraction: false,
                //     pauseOnMouseEnter: true,
                //     waitForTransition: true
                // }}
                loop={shouldLoop}
                spaceBetween={20}
                slidesPerView={1}
                speed={1200}
                navigation
                pagination={{ clickable: true }}
                onSwiper={() => setSwiperInitialized(true)}
            >
                {slide.map((item, index) => (
                    <SwiperSlide className="relative" key={index}>
                        <img
                            className="rounded-xl w-full h-full object-cover"
                            src={item.img}
                            alt={item.title}
                            loading="lazy"
                        />

                        {/* Badge - Responsive positioning and size */}
                        <span className="absolute top-4 right-4 md:top-6 md:right-6 bg-gradient-to-r from-blue-500 to-green-500 text-white text-xs md:text-sm font-semibold px-3 py-1 md:px-4 md:py-1 rounded-full shadow-lg">
                            Explore queries
                        </span>

                        {/* Improved Responsive Content Overlay */}
                        <div className=" hidden md:flex absolute bottom-0 left-0 right-0 p-4 md:bottom-8 md:left-8 md:right-auto md:p-0 lg:top-1/2 lg:left-16 lg:transform lg:-translate-y-1/2">
                            <div className="bg-white/90 p-4 md:p-6 lg:p-8 rounded-xl shadow-2xl w-full md:max-w-xs lg:max-w-md">
                                <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 lg:mb-4">
                                    {item.title}
                                </h2>
                                <p className="text-xs md:text-base font-medium text-gray-700 mb-1 md:mb-3">
                                    User Friendly Features:
                                </p>
                                <ul className="space-y-1 md:space-y-2 lg:space-y-3">
                                    {item.details?.map((feature, idx) => (
                                        <li
                                            key={idx}
                                            className="text-xs md:text-sm text-gray-700 flex items-start gap-2"
                                        >
                                            <svg
                                                className="flex-shrink-0 w-3 h-3 md:w-4 md:h-4 text-green-500 mt-0.5"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="flex-1">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SliderB;