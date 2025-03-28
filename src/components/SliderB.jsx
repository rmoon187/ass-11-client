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

const SliderB = () => {
    const [slide, setSlide] = useState([]);

    useEffect(() => {
        fetch("/slider.json")
            .then(res => res.json())
            .then(data => setSlide(data))
            .catch(error => console.error("Error fetching products:", error));
    }, []);

    return (
        <div className="relative">
            <Swiper
                className="h-[300px] md:h-[400px] lg:h-[700px] object-cover"
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                loop={true}
                spaceBetween={20}
                slidesPerView={1}
                speed={1200}
                navigation
                pagination={{ clickable: true }}
            >
                {slide.map((item, index) => (
                    <SwiperSlide className="relative" key={index}>
                        <img
                            className="rounded-xl w-full h-full object-cover"
                            src={item.img}
                            alt={item.title}
                        />

                        {/* Badge - Responsive positioning and size */}
                        <span className="absolute top-4 right-4 md:top-6 md:right-6 bg-gradient-to-r from-blue-500 to-green-500 text-white text-xs md:text-sm font-semibold px-3 py-1 md:px-4 md:py-1 rounded-full shadow-lg">
                            Explore products
                        </span>

                        {/* Content Overlay - Responsive adjustments */}
                        <div className=" hidden md:flex absolute bottom-4 left-4 right-4 p-4 md:bottom-8 md:left-8 md:right-auto md:p-6 lg:top-1/3 lg:left-16 lg:transform lg:-translate-y-1/3 rounded-xl backdrop-blur-lg bg-gradient-to-b from-white/50 to-white/35 shadow-2xl">
                            <div className="w-full md:w-80 lg:w-96">
                                <h2 className="text-xl md:text-2xl lg:text-4xl font-extrabold text-gray-900">
                                    {item.title}
                                </h2>
                                <p className="text-sm md:text-base lg:text-lg font-semibold text-gray-800 mt-2 md:mt-4 lg:mt-6">
                                    User Friendly Features:
                                </p>
                                <div className="mt-2 md:mt-3 lg:mt-4 space-y-1 md:space-y-2">
                                    {item.details?.map((feature, idx) => (
                                        <p
                                            key={idx}
                                            className="text-xs md:text-sm lg:text-base text-gray-800 flex items-start gap-2 leading-relaxed"
                                        >
                                            <span className="inline-block mt-1.5 flex-shrink-0 w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full"></span>
                                            {feature}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SliderB;