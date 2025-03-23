import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { AuthContext } from "../provider/AuthProvider";

const MyQueries = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [queries, setQueries] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/my-queries?userEmail=${user.email}`)
            .then(res => res.json())
            .then(data => setQueries(data))
            .catch(err => console.error(err));
    }, [user.email]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                await fetch(`http://localhost:5000/my-queries/${id}`, { method: "DELETE" });
                setQueries(queries.filter(query => query._id !== id));
                Swal.fire("Deleted!", "Your query has been deleted.", "success");
            } catch (error) {
                Swal.fire("Error!", "Failed to delete query.", "error");
            }
        }
    };

    return (
        <div className="container mx-auto p-6">
            {/* Banner Section */}
            <motion.div
                className="bg-blue-500 text-white text-center p-8 rounded-2xl mb-6 shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold">My Queries</h1>
                <button
                    className="mt-4 btn btn-light"
                    onClick={() => navigate("/add-query")}
                >
                    Add Query
                </button>
            </motion.div>

            {/* Queries Section */}
            {queries.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {queries.sort((a, b) => b.createdAt - a.createdAt).map(query => (
                        <div key={query._id} className="bg-white p-6 rounded-lg shadow-lg">
                            <img src={query.productImage} alt={query.productName} className="w-full h-40 object-cover rounded-md" />
                            <h2 className="text-xl font-bold mt-4">{query.queryTitle}</h2>
                            <p className="text-gray-600">{query.reasonDetails.slice(0, 100)}...</p>
                            <div className="mt-4 flex gap-2">
                                <button onClick={() => navigate(`/query/${query._id}`)} className="btn btn-primary">View Details</button>
                                <button onClick={() => navigate(`/update-query/${query._id}`)} className="btn btn-warning">Update</button>
                                <button onClick={() => handleDelete(query._id)} className="btn btn-error">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-gray-600 text-lg">No queries found. Add a query to get started!</p>
                    <button
                        className="mt-4 btn btn-success"
                        onClick={() => navigate("/add-query")}
                    >
                        Add Query
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyQueries;
