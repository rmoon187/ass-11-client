import { motion } from "framer-motion";
import Lottie from "lottie-react";
import lottiepic from "../assets/Animation - 1742632591155.json";

const HowItWorks = () => {
    return (
        <section className="py-20 relative overflow-hidden bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-600 dark:to-green-600"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-green-400 dark:bg-green-800 rounded-full filter blur-[100px] opacity-20 dark:opacity-10"></div>
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-400 dark:bg-blue-800 rounded-full filter blur-[100px] opacity-20 dark:opacity-10"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400">
                        How It Works?
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Get personalized product recommendations in just 3 simple steps
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Animation/Lottie container */}
                    <div className="lg:w-1/2">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-green-400 dark:from-blue-600/30 dark:to-green-600/30 rounded-2xl opacity-20 dark:opacity-10 blur-lg"></div>
                            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/30 dark:border-gray-600/30">
                                <Lottie animationData={lottiepic}  className="w-full max-w-md mx-auto" />
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
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Receive Recommendations",
                                description: "Get personalized suggestions from our community and experts",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Engage with Community",
                                description: "Discuss, compare, and refine your choices with other users",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-green-400 dark:from-blue-600/30 dark:to-green-600/30 rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-200"></div>
                                <div className="relative bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-600/30 overflow-hidden">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 p-3 rounded-lg bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 text-blue-600 dark:text-blue-400">
                                            {step.icon}
                                        </div>
                                        <div>
                                            <div className="flex items-center mb-2">
                                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-600 dark:to-green-600 text-white font-bold mr-3">
                                                    {index + 1}
                                                </span>
                                                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400">
                                                    {step.title}
                                                </h3>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-300 pl-11">{step.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;