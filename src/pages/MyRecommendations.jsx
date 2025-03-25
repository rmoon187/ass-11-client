import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

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
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">My Recommendations</h2>
            <div className="overflow-x-auto">
                <table className="table w-full border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2">Query</th>
                            <th className="p-2">Recommendation Title</th>
                            <th className="p-2">Recommended Product Name</th>
                            <th className="p-2">Recommendation Time</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recommendations.map((rec) => (
                            <tr key={rec._id} className="border-b">
                                <td className="p-2">{rec.queryTitle}</td>
                                <td className="p-2">{rec.RecommendationTitle}</td>
                                <td className="p-2">{rec.RecommendedProductName}</td>
                                <td className="p-2">{rec.timestamp}</td>
                                <td className="p-2">
                                    <button
                                        className="btn btn-error text-white"
                                        onClick={() => handleDelete(rec._id, rec.queryId)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyRecommendations;
