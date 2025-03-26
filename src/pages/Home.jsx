
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SliderB from "../components/SliderB";
import Marquee from "react-fast-marquee";
import { CheckCircle, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import lottiepic from "../assets/Animation - 1742632591155.json"
const Home = () => {

    const [queries, setQueries] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/my-queries?limit=6`)
            .then(res => res.json())
            .then(data => setQueries(data))
            .catch(err => console.error(err));
    }, []);



    return (
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all w-11/12 mx-auto space-y-10 my-14">

            <SliderB></SliderB>

            {/* recent queries */}
            <section className="py-12 bg-gray-100 text-center rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Recent Queries</h2>
                <div className="grid md:grid-cols-3 gap-6 px-6">
                    {queries.map((query, index) => (
                        <motion.div
                            key={query._id}
                            className="p-6 bg-white rounded-lg shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <h3 className="text-xl font-semibold mb-2 text-blue-700">{query.queryTitle}</h3>
                            <p className="text-gray-600">{query.createdAt}</p>
                            <p className="text-gray-600">{query.reasonDetails}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="py-12 bg-green-50 text-center">
                <h2 className="text-3xl font-bold text-green-600 mb-6">How It Works?</h2>
                <div className="flex flex-col md:flex-row items-center gap-8 px-6">
                    <div className="md:w-1/2">
                        <Lottie animationData={lottiepic} className="max-w-xs mx-auto" />
                    </div>
                    <div className="md:w-1/2">
                        {["Post a Query", "Receive Recommendations", "Engage with Community"].map((step, index) => (
                            <motion.div
                                key={index}
                                className="p-4 bg-white rounded-lg shadow-lg mb-4"
                                whileHover={{ scale: 1.05 }}
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.3 }}
                            >
                                <h3 className="text-lg font-semibold text-green-700">Step {index + 1}: {step}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className=" py-12 bg-blue-50 text-center">
                <h2 className="text-3xl font-bold text-blue-600 mb-6">Why Choose RecomHub?</h2>
                <div className="grid md:grid-cols-3 gap-8 px-6">
                    {[
                        { icon: CheckCircle, title: "Smart Recommendations", desc: "Get AI-powered suggestions tailored to your needs." },
                        { icon: Users, title: "Community Insights", desc: "Engage with experienced users and get real opinions." },
                        { icon: Star, title: "User-Friendly", desc: "A seamless experience for all users." }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="p-6 bg-white rounded-lg shadow-lg flex flex-col items-center"
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <item.icon size={50} className="text-blue-500 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="  py-16 px-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-center text-white rounded-2xl shadow-xl">
                <h2 className="text-4xl font-extrabold mb-8 drop-shadow-lg">🔥 Trending Products</h2>
                <Marquee
                    className="text-xl font-semibold tracking-wide"
                    speed={60}
                    gradient={true}
                    gradientWidth={100}
                    gradientColor={[255, 255, 255]}
                >
                    <span className="mx-10 px-6 py-3 bg-white text-blue-600 rounded-full shadow-md">🚀 Smart Watches</span>
                    <span className="mx-10 px-6 py-3 bg-white text-purple-600 rounded-full shadow-md">🎧 Wireless Earbuds</span>
                    <span className="mx-10 px-6 py-3 bg-white text-pink-600 rounded-full shadow-md">📱 Latest Smartphones</span>
                    <span className="mx-10 px-6 py-3 bg-white text-green-600 rounded-full shadow-md">💻 High-Performance Laptops</span>
                    <span className="mx-10 px-6 py-3 bg-white text-red-600 rounded-full shadow-md">🎮 Gaming Consoles</span>
                </Marquee>
            </section>

        </div>
    );
};

export default Home;
