import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const QueryDetails = () => {
    const { id } = useParams();
    const [query, setQuery] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        productName: "",
        image: "",
        reason: ""
    });

    useEffect(() => {
        // Fetch query details
        fetch(`http://localhost:5000/my-queries/${id}`)
            .then(res => res.json())
            .then(data => setQuery(data));

        // Fetch recommendations
        fetch(`/api/recommendations?queryId=${id}`)
            .then(res => res.json())
            .then(data => setRecommendations(data));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const recommender = { email: "currentUser@example.com", name: "Current User" }; // Replace with actual user data
        const recommendationData = {
            ...formData,
            queryId,
            queryTitle: query?.title,
            productName: query?.productName,
            userEmail: query?.userEmail,
            userName: query?.userName,
            recommenderEmail: recommender.email,
            recommenderName: recommender.name,
            timestamp: new Date().toISOString()
        };
        try {
            await fetch("/api/recommendations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(recommendationData)
            });

            await fetch(`/api/queries/${queryId}/increment`, { method: "PATCH" }); // Increment recommendation count

            Swal.fire("Success", "Recommendation added successfully!", "success");
            setRecommendations([...recommendations, recommendationData]);
        } catch (error) {
            Swal.fire("Error", "Failed to add recommendation.", "error");
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            {query && (
                <div className="bg-white shadow-md p-4 rounded-xl">
                    <h2 className="text-2xl font-semibold">{query.title}</h2>
                    <p className="text-gray-600">Product: {query.productName}</p>
                    <div className="mt-2 text-sm text-gray-500">
                        <p>By: {query.userName} ({query.userEmail})</p>
                    </div>
                </div>
            )}

            {/* Add Recommendation */}
            <div className="mt-6 bg-white shadow-md p-4 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">Add A Recommendation</h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input type="text" name="title" placeholder="Recommendation Title" required className="input input-bordered w-full" onChange={handleChange} />
                    <input type="text" name="productName" placeholder="Recommended Product Name" required className="input input-bordered w-full" onChange={handleChange} />
                    <input type="text" name="image" placeholder="Product Image URL" required className="input input-bordered w-full" onChange={handleChange} />
                    <textarea name="reason" placeholder="Recommendation Reason" required className="textarea textarea-bordered w-full" onChange={handleChange}></textarea>
                    <button type="submit" className="btn btn-primary w-full">Add Recommendation</button>
                </form>
            </div>

            {/* Recommendations List */}
            <div className="mt-6 bg-white shadow-md p-4 rounded-xl">
                <h3 className="text-xl font-semibold mb-3">All Recommendations</h3>
                {recommendations.length > 0 ? (
                    recommendations.map((rec, idx) => (
                        <div key={idx} className="border-b py-3">
                            <h4 className="font-semibold">{rec.title}</h4>
                            <p className="text-gray-600">{rec.productName}</p>
                            <img src={rec.image} alt={rec.productName} className="w-20 h-20 object-cover mt-2" />
                            <p className="text-gray-500 text-sm">{rec.reason}</p>
                            <p className="text-xs text-gray-400">By {rec.recommenderName} on {new Date(rec.timestamp).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No recommendations yet.</p>
                )}
            </div>
        </div>
    );
};

export default QueryDetails;
