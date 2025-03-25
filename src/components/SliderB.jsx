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
        <div>

            <Swiper
                className=" lg:h-[700px] object-cover "
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                // autoplay={{
                //     delay: 3000,
                //     disableOnInteraction: false,
                // }}
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
                        {/* <div className="absolute inset-0 bg-black/30 rounded-xl"></div> */}
                        {/* Badge */}
                        <span className="absolute top-10 right-6 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold px-4 py-1 rounded-full shadow-lg">
                            Explore products
                        </span>
                        {/* Content Overlay */}
                        <div className="hidden lg:flex absolute top-1/3 left-16 p-6 rounded-xl backdrop-blur-lg bg-gradient-to-b from-white/50 to-white/35 shadow-2xl">
                            <div className="w-96">
                                <h2 className="text-4xl font-extrabold text-gray-900">
                                    {item.title}
                                </h2>
                                <p className="text-lg font-semibold text-gray-800 mt-6">
                                    User Friendly Features:
                                </p>
                                {item.details?.map((feature, idx) => (
                                    <p
                                        key={idx}
                                        className="text-gray-800 flex items-center gap-3 leading-relaxed"
                                    >
                                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                                        {feature}
                                    </p>
                                ))}

                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SliderB;
