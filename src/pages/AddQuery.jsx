import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

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

    const dateTime = new Date(Date.now()).toLocaleString("en-GB", {
        hour12: true
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const queryData = {
            ...formData,
            userEmail: user.email,
            userName: user.displayName,
            userProfileImage: user.photoURL,
            createdAt: dateTime,
            recommendationCount: 0,
        };

        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/my-queries`,
                queryData,
                { withCredentials: true }
            );
            Swal.fire("Success!", "Query added successfully!", "success");
            navigate("/");
        } catch (error) {
            Swal.fire("Error!", "Failed to add query", "error");
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-6 flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-green-100 ">
            <motion.div
                className="bg-white bg-opacity-90 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-xl border border-gray-200"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.h1
                    className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-green-500 text-transparent bg-clip-text mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    Add a Query
                </motion.h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div
                        className="form-group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <label className="font-semibold text-gray-700">Product Name</label>
                        <input type="text" name="productName" className="input input-bordered w-full" onChange={handleChange} required />
                    </motion.div>

                    <motion.div
                        className="form-group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <label className="font-semibold text-gray-700">Product Brand</label>
                        <input type="text" name="productBrand" className="input input-bordered w-full" onChange={handleChange} required />
                    </motion.div>

                    <motion.div
                        className="form-group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <label className="font-semibold text-gray-700">Product Image URL</label>
                        <input type="url" name="productImage" className="input input-bordered w-full" onChange={handleChange} required />
                    </motion.div>

                    <motion.div
                        className="form-group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <label className="font-semibold text-gray-700">Query Title</label>
                        <input type="text" name="queryTitle" className="input input-bordered w-full" onChange={handleChange} required />
                    </motion.div>

                    <motion.div
                        className="form-group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <label className="font-semibold text-gray-700">Boycotting Reason Details</label>
                        <textarea name="reasonDetails" className="textarea textarea-bordered w-full" onChange={handleChange} required></textarea>
                    </motion.div>

                    <motion.button
                        type="submit"
                        className="btn btn-success w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:scale-105 transition transform duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Add Query
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default AddQuery;