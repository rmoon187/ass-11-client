import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const QueryDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [query, setQuery] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [formData, setFormData] = useState({
        RecommendationTitle: "",
        RecommendedProductName: "",
        RecommendedImage: "",
        RecommendationReason: ""
    });

    useEffect(() => {
        fetch(`http://localhost:5000/my-queries/${id}`, { credentials: "include" })
            .then(res => res.json())
            .then(data => setQuery(data));

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

            Swal.fire({
                title: "Success",
                text: "Recommendation added successfully!",
                icon: "success",
                background: "#f8fafc",
                confirmButtonColor: "#3b82f6"
            });
            setRecommendations([...recommendations, recommendationData]);
            setFormData({
                RecommendationTitle: "",
                RecommendedProductName: "",
                RecommendedImage: "",
                RecommendationReason: ""
            });
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Failed to add recommendation.",
                icon: "error",
                background: "#f8fafc",
                confirmButtonColor: "#3b82f6"
            });
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {query && (
                    <div className="bg-white rounded-2xl shadow-lg border border-blue-400 p-8">
                        <h2 className="text-3xl font-bold text-blue-700">{query.queryTitle}</h2>
                        <p className="mt-2 text-blue-600 font-medium">{query.productName}</p>
                        <p className="mt-2 text-blue-600 font-medium">{query.reasonDetails}</p>
                        <p className="text-sm text-gray-700 mt-4">Posted by {query.userName} ({query.userEmail})</p>
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-lg border border-green-400 p-8">
                    <h3 className="text-2xl font-bold text-green-700 mb-6">Add Your Recommendation</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input type="text" name="RecommendationTitle" placeholder="Title" className="w-full p-3 border border-blue-300 rounded-lg" value={formData.RecommendationTitle} onChange={handleChange} required />
                        <input type="text" name="RecommendedProductName" placeholder="Product Name" className="w-full p-3 border border-green-300 rounded-lg" value={formData.RecommendedProductName} onChange={handleChange} required />
                        <input type="text" name="RecommendedImage" placeholder="Image URL" className="w-full p-3 border border-blue-300 rounded-lg" value={formData.RecommendedImage} onChange={handleChange} required />
                        <textarea name="RecommendationReason" placeholder="Explain your recommendation" rows="4" className="w-full p-3 border border-green-300 rounded-lg" value={formData.RecommendationReason} onChange={handleChange} required></textarea>
                        <button type="submit" className="w-full bg-blue-600 hover:bg-green-600 text-white py-3 px-6 rounded-lg shadow-md transition-all">Submit</button>
                    </form>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-blue-400 p-8">
                    <h3 className="text-2xl font-bold text-blue-700">All Recommendations ({recommendations.length})</h3>
                    {recommendations.length > 0 ? (
                        <div className="space-y-4 mt-6">
                            {recommendations.map((rec, idx) => (
                                <div key={idx} className="p-5 border-l-4 border-green-500 bg-green-100 rounded-lg shadow-md">
                                    <h4 className="text-xl font-semibold text-blue-800">{rec.RecommendationTitle}</h4>
                                    <p className="text-green-700">{rec.RecommendedProductName}</p>
                                    {rec.RecommendedImage && <img src={rec.RecommendedImage} alt={rec.RecommendedProductName} className="w-32 h-32 object-cover mt-3 rounded-lg shadow-md" />}
                                    <p className="mt-3 text-gray-700">{rec.RecommendationReason}</p>
                                    <p className="mt-2 text-sm text-gray-600">By {rec.recommenderName} ({rec.recommenderEmail})</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 mt-6">No recommendations yet. Be the first to recommend something!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QueryDetails;
