
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SliderB from "../components/SliderB";
import Marquee from "react-fast-marquee";
import { CheckCircle, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import lottiepic from "../assets/Animation - 1742632591155.json"
const Home = () => {

    const [queries, setQueries] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/my-queries?limit=6`, { credentials: "include" })
            .then(res => res.json())
            .then(data => setQueries(data))
            .catch(err => console.error(err));
    }, []);



    return (
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all w-11/12 mx-auto space-y-10 my-14">

            <SliderB></SliderB>

            {/* recent queries */}
            <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50 text-center rounded-2xl shadow-xl overflow-hidden relative">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-400 rounded-full filter blur-3xl opacity-20 -mr-20 -mb-20"></div>
                <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400 rounded-full filter blur-3xl opacity-20 -ml-20 -mt-20"></div>

                <div className="relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
                            Recent Queries
                        </h2>
                    </motion.div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
                        {queries.map((query, index) => (
                            <motion.div
                                key={query._id}
                                className="p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden relative"
                                whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                {/* Card accent */}
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-green-500"></div>

                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center shadow-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
                                        {query.queryTitle}
                                    </h3>
                                    <p className="text-sm font-medium text-gray-500 mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="inline h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {query.createdAt}
                                    </p>
                                    <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                                        {query.reasonDetails}
                                    </p>
                                    <button className="mt-5 px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                                        <Link to={`query-details/${query._id}`}>View Details</Link>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-50 to-green-50">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500"></div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-green-400 rounded-full filter blur-[100px] opacity-20"></div>
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400 rounded-full filter blur-[100px] opacity-20"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
                            How It Works?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Get personalized product recommendations in just 3 simple steps
                        </p>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Animation/Lottie container */}
                        <div className="lg:w-1/2">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-green-400 rounded-2xl opacity-20 blur-lg"></div>
                                <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/30">
                                    <Lottie animationData={lottiepic} className="w-full max-w-md mx-auto" />
                                </div>
                            </div>
                        </div>

                        {/* Steps container */}
                        <div className="lg:w-1/2 space-y-8">
                            {[
                                {
                                    title: "Post a Query",
                                    description: "Describe what product you're looking for and your specific needs",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    )
                                },
                                {
                                    title: "Receive Recommendations",
                                    description: "Get personalized suggestions from our community and experts",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    )
                                },
                                {
                                    title: "Engage with Community",
                                    description: "Discuss, compare, and refine your choices with other users",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                        </svg>
                                    )
                                }
                            ].map((step, index) => (
                                <motion.div
                                    key={index}
                                    className="group relative"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-green-400 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-200"></div>
                                    <div className="relative bg-white rounded-xl p-6 shadow-lg border border-gray-100 overflow-hidden">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-r from-blue-100 to-green-100 text-blue-600">
                                                {step.icon}
                                            </div>
                                            <div>
                                                <div className="flex items-center mb-2">
                                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold mr-3">
                                                        {index + 1}
                                                    </span>
                                                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
                                                        {step.title}
                                                    </h3>
                                                </div>
                                                <p className="text-gray-600 pl-11">{step.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* Why Choose Us Section */}
            <section className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-50 to-green-50">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500"></div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-green-400 rounded-full filter blur-[100px] opacity-20"></div>
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400 rounded-full filter blur-[100px] opacity-20"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
                            Why Choose RecomHub?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            The smartest way to find products you'll love
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                ),
                                title: "Smart Recommendations",
                                description: "Our AI analyzes thousands of products to suggest the perfect match for your needs.",
                                color: "from-blue-500 to-blue-600"
                            },
                            {
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                ),
                                title: "Community Insights",
                                description: "Get real opinions from thousands of verified users with similar needs.",
                                color: "from-teal-500 to-green-600"
                            },
                            {
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                ),
                                title: "User-Friendly Experience",
                                description: "Beautiful interface designed to make product discovery effortless.",
                                color: "from-cyan-500 to-blue-600"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                className="group relative"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-green-400 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-200"></div>
                                <div className="relative h-full bg-white rounded-xl p-8 shadow-lg border border-gray-100 overflow-hidden">
                                    <div className="flex flex-col items-center text-center">
                                        <div className={`p-4 mb-6 rounded-xl bg-gradient-to-r ${feature.color} text-white shadow-md`}>
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 mb-3">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Products Section */}
            <section className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-500 to-green-600">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/30"></div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white rounded-full filter blur-[100px] opacity-10"></div>
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-white rounded-full filter blur-[100px] opacity-10"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-lg">
                            🔥 Trending Now
                        </h2>
                        <p className="text-lg text-white/80 max-w-2xl mx-auto">
                            Discover what products our community is loving right now
                        </p>
                    </motion.div>

                    {/* Marquee Container */}
                    <div className="relative mb-12">
                        {/* First Marquee */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Marquee speed={40} gradient={false} className="py-4">
                                {[
                                    { name: "Smart Watches", emoji: "⌚", bg: "from-blue-400 to-blue-500" },
                                    { name: "Wireless Earbuds", emoji: "🎧", bg: "from-teal-400 to-teal-500" },
                                    { name: "Latest Phones", emoji: "📱", bg: "from-green-400 to-green-500" },
                                    { name: "Gaming Laptops", emoji: "💻", bg: "from-cyan-400 to-cyan-500" },
                                    { name: "Smart Home", emoji: "🏠", bg: "from-blue-400 to-blue-500" },
                                    { name: "Fitness Trackers", emoji: "🏃", bg: "from-purple-400 to-purple-500" },
                                    { name: "4K TVs", emoji: "📺", bg: "from-indigo-400 to-indigo-500" },
                                ].map((product, index) => (
                                    <div key={index} className="mx-3">
                                        <div className={`bg-gradient-to-r ${product.bg} rounded-xl p-6 shadow-lg h-full flex flex-col items-center justify-center min-w-[200px]`}>
                                            <div className="text-4xl mb-3">{product.emoji}</div>
                                            <h3 className="font-bold text-white text-center">{product.name}</h3>
                                        </div>
                                    </div>
                                ))}
                            </Marquee>
                        </motion.div>

                        {/* Second Marquee (reverse direction) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="mt-6"
                        >
                            <Marquee speed={40} direction="right" gradient={false} className="py-4">
                                {[
                                    { name: "Drones", emoji: "🚁", bg: "from-amber-400 to-amber-500" },
                                    { name: "VR Headsets", emoji: "👓", bg: "from-red-400 to-red-500" },
                                    { name: "Smart Speakers", emoji: "🔊", bg: "from-emerald-400 to-emerald-500" },
                                    { name: "Digital Cameras", emoji: "📷", bg: "from-violet-400 to-violet-500" },
                                    { name: "Tablets", emoji: "📱", bg: "from-sky-400 to-sky-500" },
                                    { name: "Gaming Consoles", emoji: "🎮", bg: "from-fuchsia-400 to-fuchsia-500" },
                                    { name: "Noise Cancelling Headphones", emoji: "🎧", bg: "from-rose-400 to-rose-500" },
                                ].map((product, index) => (
                                    <div key={index} className="mx-3">
                                        <div className={`bg-gradient-to-r ${product.bg} rounded-xl p-6 shadow-lg h-full flex flex-col items-center justify-center min-w-[200px]`}>
                                            <div className="text-4xl mb-3">{product.emoji}</div>
                                            <h3 className="font-bold text-white text-center">{product.name}</h3>
                                        </div>
                                    </div>
                                ))}
                            </Marquee>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <button className="px-8 py-3 text-lg font-medium rounded-full bg-white text-blue-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                            Explore All Trending Products
                        </button>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default Home;
