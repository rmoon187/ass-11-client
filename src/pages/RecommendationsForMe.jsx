import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const RecommendationsForMe = () => {
    const { user } = useContext(AuthContext)
    const [recommendations, setRecommendations] = useState([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/recommendations?queryUserEmail=${user.email}`)
                .then((res) => res.json())
                .then((data) => setRecommendations(data))
                .catch((error) => console.error("Error fetching recommendations:", error));
        }
    }, [user.email]);
    // if (loading) {
    //     return <div className="text-center text-xl py-10">Loading recommendations...</div>;
    // }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Recommendations For Me</h2>
            {recommendations.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table w-full border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="p-3">Query Title</th>
                                <th className="p-3">Recommendation Title</th>
                                <th className="p-3">Recommended Product Name</th>
                                <th className="p-3">Recommender Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recommendations.map((rec) => (
                                <tr key={rec._id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="p-3">{rec.queryTitle}</td>
                                    <td className="p-3">{rec.RecommendationTitle}</td>
                                    <td className="p-3">{rec.RecommendedProductName}</td>
                                    <td className="p-3">{rec.recommenderEmail}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">No recommendations found.</p>
            )}
        </div>
    );
};

export default RecommendationsForMe;
