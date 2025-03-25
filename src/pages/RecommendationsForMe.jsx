import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Table } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";

const RecommendationsForMe = () => {
    const { currentUser } = useAuth();
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentUser) return;

        const fetchRecommendations = async () => {
            try {
                const response = await fetch(`/api/recommendations?user=${currentUser.email}`);
                const data = await response.json();
                setRecommendations(data);
            } catch (error) {
                toast.error("Failed to fetch recommendations.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [currentUser]);

    if (loading) {
        return <div className="text-center text-xl py-10">Loading recommendations...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Recommendations For Me</h2>
            {recommendations.length > 0 ? (
                <Card>
                    <CardContent>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Query</th>
                                    <th>Recommended Product</th>
                                    <th>Reason</th>
                                    <th>Recommender</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recommendations.map((rec) => (
                                    <tr key={rec.id}>
                                        <td>{rec.query}</td>
                                        <td>{rec.product}</td>
                                        <td>{rec.reason}</td>
                                        <td>{rec.recommender}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CardContent>
                </Card>
            ) : (
                <p className="text-gray-500">No recommendations found.</p>
            )}
        </div>
    );
};

export default RecommendationsForMe;
