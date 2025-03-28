import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const MyRecommendations = () => {
    const { user } = useContext(AuthContext);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/recommendations?userEmail=${user.email}`)
                .then((res) => res.json())
                .then((data) => setRecommendations(data))
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
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/recommendations/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.acknowledged) {
                            setRecommendations(recommendations.filter((rec) => rec._id !== id));
                            Swal.fire("Deleted!", "Your recommendation has been deleted.", "success");
                            decreaseQueryRecommendationCount(queryId);
                        }
                    })
                    .catch((error) => console.error("Error deleting recommendation:", error));
            }
        });
    };

    const decreaseQueryRecommendationCount = (queryId) => {
        fetch(`http://localhost:5000/my-queries/${queryId}/decrement`, {
            method: "PATCH",
        })
            .then((res) => res.json())
            .then(() => console.log("Recommendation count decreased"))
            .catch((error) => console.error("Error updating query count:", error));
    };

    return (
        <div className="container mx-auto p-6">
            <motion.h2
                className="text-3xl font-bold text-center text-green-600 mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                My Recommendations
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
                                <th className="p-4">Query</th>
                                <th className="p-4">Recommendation Title</th>
                                <th className="p-4">Recommended Product Name</th>
                                <th className="p-4">Recommendation Time</th>
                                <th className="p-4">Action</th>
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
                                    <td className="p-4 text-gray-700 font-medium">{rec.timestamp}</td>
                                    <td className="p-4">
                                        <button
                                            className="btn btn-error text-white hover:scale-105 transition"
                                            onClick={() => handleDelete(rec._id, rec.queryId)}
                                        >
                                            Delete
                                        </button>
                                    </td>
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

export default MyRecommendations;
