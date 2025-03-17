import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function History({ cdk }) {
    const [records, setRecords] = useState(cdk);

    const handleDelete = async (id) => {
        console.log("Deleting record with ID:", id);
        if (!confirm("Are you sure you want to delete this record?")) return;

        try {
            console.log("Deleting record with ID:", id);
            axios.delete(route("user-cdk.destroy", { "id": id }));

            setRecords(records.filter(item => item.id !== id));

            alert("Record deleted successfully!");
        } catch (error) {
            console.error("Error deleting record:", error);
            alert("Failed to delete record. Please try again.");
        }
    };

    const chartData = records.map(item => ({
        date: new Date(item.created_at).toLocaleDateString(),
        gfr: item.value
    })).sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Your CKD Records
                    </h3>

                    {/* Chart Section */}
                    {records.length > 0 && (
                        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                            <h3 className="text-xl font-semibold text-blue-600 mb-4">
                                GFR Trend Over Time
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={chartData}>
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Line type="monotone" dataKey="gfr" stroke="#2563eb" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {records.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {records.map((item, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                                    <h4 className="text-xl font-semibold text-blue-600">GFR: {item.value}</h4>
                                    <p className="text-gray-700 mt-2">
                                        <span className="font-medium text-gray-800">Stage:</span> {item.stage}
                                    </p>
                                    <p className="text-gray-500 text-sm mt-2">
                                        <span className="font-medium text-gray-600">Date:</span> {new Date(item.created_at).toLocaleDateString()}
                                    </p>

                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 mt-4">No CKD records found.</p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
