import { useEffect, useState } from "react";
import { BsGrid3X3Gap } from "react-icons/bs";
import { CiGrid2H } from "react-icons/ci";
import { IoGridOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Queries = () => {
    const [queries, setQueries] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [gridCols, setGridCols] = useState("grid-cols-3");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/my-queries")
            .then((res) => res.json())
            .then((data) => setQueries(data))
            .catch((err) => console.error("Error fetching queries:", err));
    }, []);

    const filteredQueries = queries.filter((query) =>
        query.queryTitle.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-center mb-10">All Queries</h1>
            <div className="flex  justify-between">
                <div></div>
                <div className="mb-6 ml-72 flex justify-center gap-4">
                    <input
                        type="text"
                        placeholder="Search by product name..."
                        className="input input-bordered w-full max-w-md"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <div className="mb-6 flex justify-center items-center gap-5">
                    <h3 className="text-xl font-semibold ">Change Layout</h3>
                    <button className="btn btn-outline" onClick={() => setGridCols("grid-cols-1")}>
                        <CiGrid2H />
                    </button>
                    <button className="btn btn-outline" onClick={() => setGridCols("grid-cols-2")}>
                        <IoGridOutline />
                    </button>
                    <button className="btn btn-outline" onClick={() => setGridCols("grid-cols-3")}>
                        <BsGrid3X3Gap />
                    </button>
                </div>
            </div>
            <div className={`grid ${gridCols} gap-6`}>
                {filteredQueries.length > 0 ? (
                    filteredQueries.map((query) => (
                        <div key={query._id} className="card bg-white shadow-xl p-4 rounded-xl">
                            <h2 className="text-lg font-semibold mb-2">{query.queryTitle}</h2>
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
                    ))
                ) : (
                    <p className="text-center text-gray-500">No matching queries found.</p>
                )}
            </div>
        </div>
    );
};

export default Queries;
