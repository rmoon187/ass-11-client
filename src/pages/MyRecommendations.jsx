import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";

const MyRecommendations = () => {
    const { user } = useContext(AuthContext);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        if (user) {
            axios.get(`${import.meta.env.VITE_API_URL}/recommendations`, {
                params: { userEmail: user.email },
                withCredentials: true
            })
                .then((response) => setRecommendations(response.data))
                .catch((error) => console.error("Error fetching recommendations:", error));
        }
    }, [user.email]);

    const handleDelete = (id, queryId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            background: '#f8fafc dark:bg-gray-800',
            color: '#1e293b dark:text-white'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_API_URL}/recommendations/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.acknowledged) {
                            setRecommendations(recommendations.filter((rec) => rec._id !== id));
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your recommendation has been deleted.",
                                icon: "success",
                                background: '#f8fafc dark:bg-gray-800',
                                color: '#1e293b dark:text-white'
                            });
                            decreaseQueryRecommendationCount(queryId);
                        }
                    })
                    .catch((error) => console.error("Error deleting recommendation:", error));
            }
        });
    };

    const decreaseQueryRecommendationCount = (queryId) => {
        fetch(`${import.meta.env.VITE_API_URL}/my-queries/${queryId}/decrement`, {
            method: "PATCH",
        })
            .then((res) => res.json())
            .then(() => console.log("Recommendation count decreased"))
            .catch((error) => console.error("Error updating query count:", error));
    };

    return (
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 dark:bg-gray-900 min-h-screen">
            <motion.h2
                className="text-2xl sm:text-3xl font-bold text-center text-green-600 dark:text-green-400 mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                My Recommendations
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
                                    <th className="p-3 text-left">Query</th>
                                    <th className="p-3 text-left">Title</th>
                                    <th className="p-3 text-left">Product</th>
                                    <th className="p-3 text-left">Time</th>
                                    <th className="p-3 text-center">Action</th>
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
                                        <td className="p-3 text-gray-700 dark:text-gray-300">{rec.timestamp}</td>
                                        <td className="p-3 text-center">
                                            <button
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 dark:hover:bg-red-700 transition text-sm sm:text-base"
                                                onClick={() => handleDelete(rec._id, rec.queryId)}
                                            >
                                                Delete
                                            </button>
                                        </td>
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
                                <div className="space-y-2">
                                    <div>
                                        <span className="font-semibold dark:text-gray-200">Query: </span>
                                        <span className="text-gray-700 dark:text-gray-300">{rec.queryTitle}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold dark:text-gray-200">Title: </span>
                                        <span className="text-gray-700 dark:text-gray-300">{rec.RecommendationTitle}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold dark:text-gray-200">Product: </span>
                                        <span className="text-gray-700 dark:text-gray-300">{rec.RecommendedProductName}</span>
                                    </div>
                                    <div>
                                        <span className="font-semibold dark:text-gray-200">Time: </span>
                                        <span className="text-gray-700 dark:text-gray-300">{rec.timestamp}</span>
                                    </div>
                                    <div className="pt-2">
                                        <button
                                            className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 dark:hover:bg-red-700 transition"
                                            onClick={() => handleDelete(rec._id, rec.queryId)}
                                        >
                                            Delete
                                        </button>
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
                    <p className="text-sm mt-2">Your recommendations will appear here once you receive them.</p>
                </motion.div>
            )}
        </div>
    );
};

export default MyRecommendations;