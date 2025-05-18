import { motion } from "framer-motion";

const WhyChooseUs = () => {
    return (
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
    );
};

export default WhyChooseUs;