import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { AuthContext } from "../provider/AuthProvider";

const AddQuery = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        productName: "",
        productBrand: "",
        productImage: "",
        queryTitle: "",
        reasonDetails: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const queryData = {
            ...formData,
            userEmail: user.email,
            userName: user.displayName,
            userProfileImage: user.photoURL,
            createdAt: new Date(Date.now()).toISOString().replace("T", " ").slice(0, 19),
            recommendationCount: 0,
        };

        try {
            await fetch("http://localhost:5000/my-queries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(queryData),
            });
            Swal.fire("Success!", "Query added successfully!", "success");
            navigate("/");
        } catch (error) {
            Swal.fire("Error!", "Failed to add query", "error");
            console.log(error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <motion.div
                className="bg-blue-500 text-white text-center p-8 rounded-2xl mb-6 shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold">Add a Query</h1>
            </motion.div>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="label">Product Name</label>
                    <input type="text" name="productName" className="input input-bordered w-full" onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="label">Product Brand</label>
                    <input type="text" name="productBrand" className="input input-bordered w-full" onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="label">Product Image URL</label>
                    <input type="url" name="productImage" className="input input-bordered w-full" onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="label">Query Title</label>
                    <input type="text" name="queryTitle" className="input input-bordered w-full" onChange={handleChange} required />
                </div>
                <div className="mb-4">
                    <label className="label">Boycotting Reason Details</label>
                    <textarea name="reasonDetails" className="textarea textarea-bordered w-full" onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn btn-success w-full">Add Query</button>
            </form>
        </div>
    );
};

export default AddQuery;
