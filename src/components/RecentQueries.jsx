import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const RecentQueries = ({ queries }) => {
    return (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 text-center rounded-2xl shadow-xl overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-600 dark:to-green-600"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-400 dark:bg-green-800 rounded-full filter blur-3xl opacity-20 dark:opacity-10 -mr-20 -mb-20"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400 dark:bg-blue-800 rounded-full filter blur-3xl opacity-20 dark:opacity-10 -ml-20 -mt-20"></div>

            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400">
                        Recent Queries
                    </h2>
                </motion.div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
                    {queries.map((query, index) => (
                        <motion.div
                            key={query._id}
                            className="p-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-600/20 overflow-hidden relative"
                            whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            {/* Card accent */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-400 dark:to-green-400"></div>

                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 flex items-center justify-center shadow-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400">
                                    {query.queryTitle}
                                </h3>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="inline h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {query.createdAt}
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm leading-relaxed">
                                    {query.reasonDetails}
                                </p>
                                <button className="mt-5 px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-blue-500 to-green-500 dark:from-blue-600 dark:to-green-600 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                                    <Link to={`query-details/${query._id}`}>View Details</Link>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentQueries;