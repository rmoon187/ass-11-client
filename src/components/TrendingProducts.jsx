import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

const TrendingProducts = () => {
    return (
        <section className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-500 to-green-600 dark:from-gray-800 dark:to-gray-900">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/30 dark:bg-gray-600"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white rounded-full filter blur-[100px] opacity-10 dark:bg-gray-700"></div>
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-white rounded-full filter blur-[100px] opacity-10 dark:bg-gray-700"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-lg dark:text-gray-100">
                        🔥 Trending Now
                    </h2>
                    <p className="text-lg text-white/80 dark:text-gray-300 max-w-2xl mx-auto">
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
                                { name: "Smart Watches", emoji: "⌚", bg: "from-blue-400 to-blue-500 dark:from-gray-700 dark:to-gray-600" },
                                { name: "Wireless Earbuds", emoji: "🎧", bg: "from-teal-400 to-teal-500 dark:from-gray-600 dark:to-gray-700" },
                                { name: "Latest Phones", emoji: "📱", bg: "from-green-400 to-green-500 dark:from-gray-700 dark:to-gray-800" },
                                { name: "Gaming Laptops", emoji: "💻", bg: "from-cyan-400 to-cyan-500 dark:from-gray-600 dark:to-gray-700" },
                                { name: "Smart Home", emoji: "🏠", bg: "from-blue-400 to-blue-500 dark:from-gray-700 dark:to-gray-800" },
                                { name: "Fitness Trackers", emoji: "🏃", bg: "from-purple-400 to-purple-500 dark:from-gray-800 dark:to-gray-700" },
                                { name: "4K TVs", emoji: "📺", bg: "from-indigo-400 to-indigo-500 dark:from-gray-700 dark:to-gray-600" },
                            ].map((product, index) => (
                                <div key={index} className="mx-3">
                                    <div className={`bg-gradient-to-r ${product.bg} rounded-xl p-6 shadow-lg h-full flex flex-col items-center justify-center min-w-[200px] dark:shadow-gray-900/50`}>
                                        <div className="text-4xl mb-3">{product.emoji}</div>
                                        <h3 className="font-bold text-white dark:text-gray-100 text-center">{product.name}</h3>
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
                                { name: "Drones", emoji: "🚁", bg: "from-amber-400 to-amber-500 dark:from-gray-600 dark:to-gray-700" },
                                { name: "VR Headsets", emoji: "👓", bg: "from-red-400 to-red-500 dark:from-gray-700 dark:to-gray-800" },
                                { name: "Smart Speakers", emoji: "🔊", bg: "from-emerald-400 to-emerald-500 dark:from-gray-800 dark:to-gray-700" },
                                { name: "Digital Cameras", emoji: "📷", bg: "from-violet-400 to-violet-500 dark:from-gray-700 dark:to-gray-600" },
                                { name: "Tablets", emoji: "📱", bg: "from-sky-400 to-sky-500 dark:from-gray-600 dark:to-gray-700" },
                                { name: "Gaming Consoles", emoji: "🎮", bg: "from-fuchsia-400 to-fuchsia-500 dark:from-gray-700 dark:to-gray-800" },
                                { name: "Noise Cancelling Headphones", emoji: "🎧", bg: "from-rose-400 to-rose-500 dark:from-gray-800 dark:to-gray-700" },
                            ].map((product, index) => (
                                <div key={index} className="mx-3">
                                    <div className={`bg-gradient-to-r ${product.bg} rounded-xl p-6 shadow-lg h-full flex flex-col items-center justify-center min-w-[200px] dark:shadow-gray-900/50`}>
                                        <div className="text-4xl mb-3">{product.emoji}</div>
                                        <h3 className="font-bold text-white dark:text-gray-100 text-center">{product.name}</h3>
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
                    <button className="px-8 py-3 text-lg font-medium rounded-full bg-white text-blue-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:shadow-gray-900/50">
                        Explore All Trending Products
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default TrendingProducts;