import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const QueryDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext)
    const [query, setQuery] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [formData, setFormData] = useState({
        RecommendationTitle: "",
        RecommendedProductName: "",
        RecommendedImage: "",
        RecommendationReason: ""
    });

    useEffect(() => {
        // Fetch query details
        fetch(`http://localhost:5000/my-queries/${id}`, { credentials: "include" })
            .then(res => res.json())
            .then(data => setQuery(data));

        // Fetch recommendations
        fetch(`http://localhost:5000/recommendations/${id}`)
            .then(res => res.json())
            .then(data => setRecommendations(data));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const dateTime = new Date(Date.now()).toLocaleString("en-GB", {
        hour12: true
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const recommendationData = {
            ...formData,
            queryId: id,
            queryTitle: query?.queryTitle,
            productName: query?.productName,
            userEmail: query?.userEmail,
            userName: query?.userName,
            recommenderEmail: user.email,
            recommenderName: user.displayName,
            timestamp: dateTime
        };
        try {
            await fetch("http://localhost:5000/recommendations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(recommendationData)
            });

            await fetch(`http://localhost:5000/my-queries/${id}/increment`, { method: "PATCH" });

            Swal.fire("Success", "Recommendation added successfully!", "success");
            setRecommendations([...recommendations, recommendationData]);
            setFormData({
                RecommendationTitle: "",
                RecommendedProductName: "",
                RecommendedImage: "",
                RecommendationReason: ""
            });
        } catch (error) {
            Swal.fire("Error", "Failed to add recommendation.", "error");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Query Card */}
                {query && (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">{query.queryTitle}</h2>
                                    <p className="mt-1 text-indigo-600 font-medium">{query.productName}</p>
                                </div>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                    Query
                                </span>
                            </div>
                            <div className="mt-4 flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="h-8 w-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 font-medium">
                                        {query.userName?.charAt(0).toUpperCase()}
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">{query.userName}</p>
                                    <p className="text-xs text-gray-500">{query.userEmail}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Recommendation Form */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Add Your Recommendation</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="RecommendationTitle" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    id="RecommendationTitle"
                                    name="RecommendationTitle"
                                    placeholder="e.g. Best Alternative for Summer"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-50 transition-all"
                                    value={formData.RecommendationTitle}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="RecommendedProductName" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                    <input
                                        type="text"
                                        id="RecommendedProductName"
                                        name="RecommendedProductName"
                                        placeholder="Product name"
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-blue-50 transition-all"
                                        value={formData.RecommendedProductName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="RecommendedImage" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                    <input
                                        type="text"
                                        id="RecommendedImage"
                                        name="RecommendedImage"
                                        placeholder="https://example.com/image.jpg"
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-green-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-green-50 transition-all"
                                        value={formData.RecommendedImage}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="RecommendationReason" className="block text-sm font-medium text-gray-700 mb-1">Your Recommendation</label>
                                <textarea
                                    id="RecommendationReason"
                                    name="RecommendationReason"
                                    placeholder="Explain why this is a good recommendation..."
                                    rows="4"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-purple-50 transition-all"
                                    value={formData.RecommendationReason}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                                >
                                    Submit Recommendation
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Recommendations List */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">All Recommendations ({recommendations.length})</h3>

                        {recommendations.length > 0 ? (
                            <div className="space-y-4">
                                {recommendations.map((rec, idx) => (
                                    <div key={idx} className="border-l-4 border-indigo-400 pl-4 py-3 bg-gray-50 rounded-r-lg">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-lg font-semibold text-gray-800">{rec.RecommendationTitle}</h4>
                                            <span className="text-xs text-gray-500">{new Date(rec.timestamp).toLocaleDateString()}</span>
                                        </div>
                                        <p className="mt-1 text-blue-600 font-medium">{rec.RecommendedProductName}</p>

                                        {rec.RecommendedImage && (
                                            <div className="mt-2">
                                                <img
                                                    src={rec.RecommendedImage}
                                                    alt={rec.RecommendedProductName}
                                                    className="w-24 h-24 object-cover rounded-lg shadow-xs border border-gray-200"
                                                />
                                            </div>
                                        )}

                                        <p className="mt-2 text-gray-700">{rec.RecommendationReason}</p>

                                        <div className="mt-3 flex items-center">
                                            <div className="flex-shrink-0">
                                                <div className="h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-medium text-xs">
                                                    {rec.recommenderName?.charAt(0).toUpperCase()}
                                                </div>
                                            </div>
                                            <div className="ml-2">
                                                <p className="text-xs font-medium text-gray-900">{rec.recommenderName}</p>
                                                <p className="text-xs text-gray-500">{rec.recommenderEmail}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No recommendations yet</h3>
                                <p className="mt-1 text-xs text-gray-500">Be the first to recommend something!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QueryDetails;