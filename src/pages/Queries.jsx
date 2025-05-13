import { useEffect, useState } from "react";
import { BsGrid3X3Gap } from "react-icons/bs";
import { CiGrid2H } from "react-icons/ci";
import { IoGridOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const Queries = () => {
    const [queries, setQueries] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [gridCols, setGridCols] = useState("md:grid-cols-2 lg:grid-cols-3");
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState("most"); // 'most' or 'least'
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${import.meta.env.VITE_API_URL}/my-queries`, { withCredentials: true })
            .then((data) => {
                setQueries(data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching queries:", err);
                setIsLoading(false);
            });
    }, []);

    const filteredQueries = queries
        .filter((query) =>
            query.queryTitle.toLowerCase().includes(searchText.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOrder === "most") {
                return b.recommendationCount - a.recommendationCount;
            } else {
                return a.recommendationCount - b.recommendationCount;
            }
        });

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 50 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const hoverEffect = {
        scale: 1.03,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.3 }
    };

    // Handle grid change with responsive classes
    const handleGridChange = (cols) => {
        switch(cols) {
            case 1:
                setGridCols("grid-cols-1");
                break;
            case 2:
                setGridCols("md:grid-cols-2");
                break;
            case 3:
                setGridCols("md:grid-cols-2 lg:grid-cols-3");
                break;
            default:
                setGridCols("md:grid-cols-2 lg:grid-cols-3");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-8 sm:mb-12"
            >
                <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 mb-3 sm:mb-4">
                    Community Queries
                </h1>
                <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto">
                    Explore questions from our community members
                </p>
            </motion.div>

            {/* Controls Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row justify-between items-center mb-8 sm:mb-10 gap-4 sm:gap-6 bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-xl shadow-sm border border-white/20"
            >
                <div className="w-full md:w-1/2">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search queries..."
                            className="input input-bordered w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <svg
                            className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 w-full md:w-auto justify-end">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-700 font-medium hidden sm:block text-sm sm:text-base">Sort by:</span>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="select select-bordered select-sm sm:select-md rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                        >
                            <option value="most">Most Recommended</option>
                            <option value="least">Least Recommended</option>
                        </select>
                    </div>
                    
                    <span className="text-gray-700 font-medium hidden sm:block text-sm sm:text-base">Layout:</span>
                    <div className="flex gap-1 sm:gap-2">
                        <button
                            onClick={() => handleGridChange(1)}
                            className={`p-1 sm:p-2 rounded-lg ${gridCols === "grid-cols-1" ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                            aria-label="Single column layout"
                        >
                            <CiGrid2H className="text-lg sm:text-xl" />
                        </button>
                        <button
                            onClick={() => handleGridChange(2)}
                            className={`p-1 sm:p-2 rounded-lg ${gridCols.includes("md:grid-cols-2") && !gridCols.includes("lg:grid-cols-3") ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                            aria-label="Two column layout"
                        >
                            <IoGridOutline className="text-lg sm:text-xl" />
                        </button>
                        <button
                            onClick={() => handleGridChange(3)}
                            className={`p-1 sm:p-2 rounded-lg ${gridCols.includes("lg:grid-cols-3") ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                            aria-label="Three column layout"
                        >
                            <BsGrid3X3Gap className="text-lg sm:text-xl" />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Queries Grid */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className={`grid grid-cols-1 ${gridCols} gap-4 sm:gap-6 md:gap-8 max-w-screen-xl mx-auto`}
                >
                    {filteredQueries.length > 0 ? (
                        filteredQueries.map((query, index) => (
                            <motion.div
                                key={query._id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true, margin: "20px" }}
                                whileHover={hoverEffect}
                                className="p-4 sm:p-6 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-white/20 overflow-hidden relative"
                            >
                                {/* Card accent */}
                                <div className="absolute top-0 left-0 w-full h-1 sm:h-2 bg-gradient-to-r from-blue-500 to-green-500"></div>

                                <div className="flex flex-col items-center pt-1 sm:pt-2">
                                    {/* Icon container */}
                                    <div className="w-10 h-10 sm:w-14 sm:h-14 mb-3 sm:mb-4 rounded-full bg-gradient-to-r from-blue-100 to-green-100 flex items-center justify-center shadow-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>

                                    {/* Title with gradient text */}
                                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
                                        {query.queryTitle}
                                    </h3>

                                    {/* Date */}
                                    <p className="text-xs sm:text-sm font-medium text-gray-500 mb-3 sm:mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="inline h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {new Date(query.createdAt).toLocaleDateString()}
                                    </p>

                                    {/* Query details */}
                                    <p className="text-gray-600 mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed text-center line-clamp-3">
                                        {query.reasonDetails}
                                    </p>

                                    {/* Footer with recommendations and button */}
                                    <div className="w-full flex justify-between items-center mt-auto">
                                        <span className="inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            {query.recommendationCount} Recommendation
                                        </span>
                                        <button
                                            onClick={() => navigate(`/query-details/${query._id}`)}
                                            className="px-3 py-1 sm:px-4 sm:py-2 text-xs font-medium rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                                        >
                                            Recommend
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            variants={item}
                            className="col-span-full text-center py-8 sm:py-12"
                        >
                            <div className="max-w-md mx-auto">
                                <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="mt-2 text-base sm:text-lg font-medium text-gray-900">No queries found</h3>
                                <p className="mt-1 text-sm sm:text-base text-gray-500">
                                    {searchText ? "Try adjusting your search or filter to find what you're looking for." : "There are currently no queries available."}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default Queries;