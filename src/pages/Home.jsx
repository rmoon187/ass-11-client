import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import SliderB from "../components/SliderB";
import RecentQueries from "../components/RecentQueries";
import HowItWorks from "../components/HowItWorks";
import WhyChooseUs from "../components/WhyChooseUs";
import TrendingProducts from "../components/TrendingProducts";

const Home = () => {
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/my-queries?limit=6`, { withCredentials: true })
            .then(data => setQueries(data.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="bg-white dark:text-white transition-all w-11/12 mx-auto space-y-10 my-14">
            <SliderB />
            <RecentQueries queries={queries} />
            <HowItWorks />
            <WhyChooseUs />
            <TrendingProducts />
        </div>
    );
};

export default Home;