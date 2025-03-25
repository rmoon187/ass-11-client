import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Queries = () => {
    const [queries, setQueries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        fetch("http://localhost:5000/my-queries")
            .then((res) => res.json())
            .then((data) => setQueries(data))
            .catch((err) => console.error("Error fetching queries:", err));
    }, []);


    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-center mb-6">All Queries</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {queries.sort((a, b) => b.createdAt - a.createdAt).map((query) => (
                    <div key={query._id} className="card bg-white shadow-xl p-4 rounded-xl">
                        <h2 className="text-lg font-semibold mb-2">{query.queryTitle
                        }</h2>
                        <p className="text-gray-600 mb-4">{query.reasonDetails}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-blue-500 font-semibold">
                                {query.recommendationCount} Recommendations
                            </span>
                            <button
                                onClick={() => navigate(`/query-details/${query._id}`)}
                                className="btn btn-primary btn-sm"
                            >
                                Recommend
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Queries;
