import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { motion } from "framer-motion";
import axios from "axios";

const RecommendationsForMe = () => {
    const { user } = useContext(AuthContext);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        if (user) {
            axios.get(`${import.meta.env.VITE_API_URL}/recommendations`, {
                params: { queryUserEmail: user.email },
                withCredentials: true
            })
                .then((response) => setRecommendations(response.data))
                .catch((error) => console.error("Error fetching recommendations:", error));
        }
    }, [user.email]);

    return (
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-900 min-h-screen">
            <motion.h2
                className="text-2xl sm:text-3xl font-bold text-center text-green-600 dark:text-green-400 mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Recommendations For Me
            </motion.h2>

            {recommendations.length > 0 ? (
                <motion.div
                    className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Desktop Table */}
                    <div className="hidden md:block">
                        <table className="w-full border border-gray-300 dark:border-gray-600">
                            <thead>
                                <tr className="bg-gradient-to-r from-blue-600 to-green-500 dark:from-blue-700 dark:to-green-600 text-white">
                                    <th className="p-3 text-left">Query Title</th>
                                    <th className="p-3 text-left">Recommendation</th>
                                    <th className="p-3 text-left">Product</th>
                                    <th className="p-3 text-left">Recommender</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recommendations.map((rec, index) => (
                                    <motion.tr
                                        key={rec._id}
                                        className={`border-b transition-all duration-300 ${
                                            index % 2 === 0 
                                                ? 'bg-blue-50 dark:bg-gray-700' 
                                                : 'bg-green-50 dark:bg-gray-600'
                                        } hover:bg-gradient-to-r from-green-200 to-blue-200 dark:from-green-700 dark:to-blue-700`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <td className="p-3 text-gray-700 dark:text-gray-300">{rec.queryTitle}</td>
                                        <td className="p-3 text-gray-700 dark:text-gray-300">{rec.RecommendationTitle}</td>
                                        <td className="p-3 text-gray-700 dark:text-gray-300">{rec.RecommendedProductName}</td>
                                        <td className="p-3 text-gray-700 dark:text-gray-300">{rec.recommenderEmail}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4 p-4">
                        {recommendations.map((rec) => (
                            <motion.div
                                key={rec._id}
                                className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow p-4"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="space-y-3">
                                    <div>
                                        <span className="font-semibold dark:text-white">Query: </span>
                                        <span className="text-gray-700 dark:text-gray-300">{rec.queryTitle}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold dark:text-white">Recommendation: </span>
                                        <span className="text-gray-700 dark:text-gray-300">{rec.RecommendationTitle}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold dark:text-white">Product: </span>
                                        <span className="text-gray-700 dark:text-gray-300">{rec.RecommendedProductName}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold dark:text-white">From: </span>
                                        <span className="text-gray-700 dark:text-gray-300">{rec.recommenderEmail}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    className="text-gray-500 dark:text-gray-400 text-center mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-lg">No recommendations found.</p>
                    <p className="text-sm mt-2">Recommendations from others will appear here when available.</p>
                </motion.div>
            )}
        </div>
    );
};

export default RecommendationsForMe;