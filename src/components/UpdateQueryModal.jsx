import { useState, useEffect } from "react";

const UpdateQueryModal = ({ query, modalRef, onClose, onUpdate }) => {
    const [updatedQuery, setUpdatedQuery] = useState(query);

    useEffect(() => {
        setUpdatedQuery(query);
    }, [query]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedQuery({ ...updatedQuery, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onUpdate(updatedQuery);
    };

    return (
        <dialog ref={modalRef} className="modal">
            <div className="modal-box bg-gradient-to-r from-blue-500 via-green-400 to-purple-500 text-white p-8 rounded-3xl shadow-2xl max-w-2xl w-full">
                <h3 className="text-3xl font-bold text-center mb-6">Update Query</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-lg font-semibold mb-2">Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            value={updatedQuery?.productName || ""}
                            onChange={handleInputChange}
                            className="input input-bordered w-full text-black py-3 px-4 rounded-xl border-2 border-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold mb-2">Product Brand</label>
                        <input
                            type="text"
                            name="productBrand"
                            value={updatedQuery?.productBrand || ""}
                            onChange={handleInputChange}
                            className="input input-bordered w-full text-black py-3 px-4 rounded-xl border-2 border-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold mb-2">Product Image URL</label>
                        <input
                            type="url"
                            name="productImage"
                            value={updatedQuery?.productImage || ""}
                            onChange={handleInputChange}
                            className="input input-bordered w-full text-black py-3 px-4 rounded-xl border-2 border-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold mb-2">Query Title</label>
                        <input
                            type="text"
                            name="queryTitle"
                            value={updatedQuery?.queryTitle || ""}
                            onChange={handleInputChange}
                            className="input input-bordered w-full text-black py-3 px-4 rounded-xl border-2 border-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold mb-2">Boycotting Reason Details</label>
                        <textarea
                            name="reasonDetails"
                            value={updatedQuery?.reasonDetails || ""}
                            onChange={handleInputChange}
                            className="textarea textarea-bordered w-full text-black py-3 px-4 rounded-xl border-2 border-white"
                            required
                        ></textarea>
                    </div>
                    <div className="modal-action flex justify-between">
                        <button type="submit" className="btn bg-yellow-400 text-black font-bold py-3 px-6 rounded-xl hover:bg-yellow-500">Update</button>
                        <button type="button" className="btn bg-gray-300 text-black font-bold py-3 px-6 rounded-xl hover:bg-gray-400" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default UpdateQueryModal;
