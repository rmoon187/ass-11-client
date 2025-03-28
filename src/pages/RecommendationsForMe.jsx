import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { motion } from "framer-motion";

const RecommendationsForMe = () => {
    const { user } = useContext(AuthContext);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/recommendations?queryUserEmail=${user.email}`)
                .then((res) => res.json())
                .then((data) => setRecommendations(data))
                .catch((error) => console.error("Error fetching recommendations:", error));
        }
    }, [user.email]);

    return (
        <div className="container mx-auto p-6">
            <motion.h2
                className="text-3xl font-bold text-center text-green-600 mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Recommendations For Me
            </motion.h2>
            {recommendations.length > 0 ? (
                <motion.div
                    className="overflow-x-auto bg-white shadow-xl rounded-2xl p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <table className="w-full border border-gray-300 rounded-xl overflow-hidden">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-600 to-green-500 text-white">
                                <th className="p-4">Query Title</th>
                                <th className="p-4">Recommendation Title</th>
                                <th className="p-4">Recommended Product Name</th>
                                <th className="p-4">Recommender Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recommendations.map((rec, index) => (
                                <motion.tr
                                    key={rec._id}
                                    className={`border-b transition-all duration-300 ${index % 2 === 0 ? 'bg-blue-100' : 'bg-green-100'} hover:bg-gradient-to-r from-green-300 to-blue-300 hover:scale-[1.02]`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <td className="p-4 text-gray-700 font-medium">{rec.queryTitle}</td>
                                    <td className="p-4 text-gray-700 font-medium">{rec.RecommendationTitle}</td>
                                    <td className="p-4 text-gray-700 font-medium">{rec.RecommendedProductName}</td>
                                    <td className="p-4 text-gray-700 font-medium">{rec.recommenderEmail}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            ) : (
                <motion.p
                    className="text-gray-500 text-center mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    No recommendations found.
                </motion.p>
            )}
        </div>
    );
};

export default RecommendationsForMe;
