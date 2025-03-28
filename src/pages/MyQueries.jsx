import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { AuthContext } from "../provider/AuthProvider";
import UpdateQueryModal from "../components/UpdateQueryModal";

const MyQueries = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [queries, setQueries] = useState([]);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const modalRef = useRef(null);

    useEffect(() => {
        fetch(`http://localhost:5000/my-queries?userEmail=${user.email}`, { credentials: "include" })
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
                console.error(error);
            }
        }
    };

    const handleOpenModal = (query) => {
        setSelectedQuery(query);
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    const handleCloseModal = () => {
        if (modalRef.current) {
            modalRef.current.close();
        }
    };

    const handleUpdate = async (updatedQuery) => {
        try {
            const response = await fetch(`http://localhost:5000/my-queries/${updatedQuery._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedQuery),
            });

            if (response.ok) {
                setQueries(queries.map(q => (q._id === updatedQuery._id ? updatedQuery : q)));
                Swal.fire("Updated!", "Your query has been updated.", "success");
                handleCloseModal()
            } else {
                Swal.fire("Error!", "Failed to update query.", "error");
                console.error(error);
            }
        } catch (error) {
            Swal.fire("Error!", "Something went wrong.", "error");
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            {/* Banner Section */}
            <motion.div
                className="relative bg-gradient-to-r from-green-700 to-blue-800 text-white text-center p-12 rounded-2xl mb-8 shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-10 left-20 w-32 h-32 bg-white rounded-full mix-blend-overlay"></div>
                    <div className="absolute bottom-10 right-20 w-40 h-40 bg-purple-300 rounded-full mix-blend-overlay"></div>
                </div>

                <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Your Support Queries</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                        Manage all your product inquiries and support requests in one place
                    </p>
                    <button
                        className="px-8 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        onClick={() => navigate("/add-query")}
                    >
                        + Add New Query
                    </button>
                </div>
            </motion.div>

            {/* Queries Section */}
            {queries.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {queries.map(query => (
                        <div key={query._id} className="bg-white p-6 rounded-lg shadow-lg">
                            <img src={query.productImage} alt={query.productName} className="w-52 h-52 mx-auto rounded-md" />
                            <h2 className="text-xl font-bold mt-4">{query.queryTitle}</h2>
                            <p className="text-gray-600">{query.reasonDetails.slice(0, 100)}...</p>
                            <div className="mt-4 flex gap-2">
                                <button onClick={() => navigate(`/query-details/${query._id}`)} className="btn btn-primary">View Details</button>
                                <button onClick={() => handleOpenModal(query)} className="btn btn-warning">Update</button>
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

            {/* Update Modal */}
            {selectedQuery && (
                <UpdateQueryModal
                    query={selectedQuery}
                    onClose={handleCloseModal}
                    onUpdate={handleUpdate}
                    modalRef={modalRef}
                />
            )}
        </div>
    );
};

export default MyQueries;
