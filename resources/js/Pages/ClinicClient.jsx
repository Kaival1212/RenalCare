import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function ClinicClient({ client }) {
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('');
    const [ethnicity, setEthnicity] = useState('');
    const [creatinine, setCreatinine] = useState('');
    const [gfr, setGFR] = useState(null);
    const [stage, setStage] = useState('');
    const [ckdRecords, setCkdRecords] = useState(client.cdk);

    // Function to calculate eGFR
    const calculateGFR = () => {
        if (!age || !sex || !ethnicity || !creatinine) {
            alert("Please enter all required details.");
            return;
        }

        let creatinineValue = parseFloat(creatinine) / 88.4; // Convert μmol/L to mg/dL
        let ageValue = parseFloat(age);

        // Apply the formula
        let gfrValue = 186 * Math.pow(creatinineValue, -1.154) * Math.pow(ageValue, -0.203);

        if (sex === "female") gfrValue *= 0.742;
        if (ethnicity === "black") gfrValue *= 1.210;

        gfrValue = gfrValue.toFixed(2);
        setGFR(gfrValue);

        // Determine CKD stage
        let stageText = '';
        if (gfrValue >= 90) stageText = 'Stage 1 (Normal)';
        else if (gfrValue >= 60) stageText = 'Stage 2 (Mild)';
        else if (gfrValue >= 30) stageText = 'Stage 3 (Moderate)';
        else if (gfrValue >= 15) stageText = 'Stage 4 (Severe)';
        else stageText = 'Stage 5 (Kidney Failure)';

        setStage(stageText);
    };

    // Function to save new CKD record
    const saveGFR = async () => {
        try {
            const response = await axios.post(route('clinic-user-cdk.store'), {
                user_id: client.id,
                gfr,
                stage
            });

            // Update UI with new CKD record
            setCkdRecords([...ckdRecords, {
                id: response.data.id,
                value: gfr,
                stage: stage,
                created_at: new Date().toISOString()
            }]);

            alert("GFR saved successfully!");
        } catch (error) {
            console.error("Error saving GFR:", error);
            alert("Failed to save GFR. Please try again.");
        }
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-2xl font-bold leading-tight text-gray-800">Client Overview</h2>}
        >
            <Head title="Client" />

            <div className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-lg font-semibold text-gray-700 mb-6">
                        Client & CKD Information
                    </h3>

                    <div className="mb-10 p-6 bg-white rounded-lg shadow-md">
                        {/* Client Info */}
                        <h4 className="text-xl font-semibold text-blue-600">{client.name}</h4>
                        <p className="text-gray-700 mt-1">Email: <span className="text-gray-800 font-medium">{client.email}</span></p>
                        <p className="text-gray-700">Clinic ID: <span className="text-gray-800 font-medium">{client.clinic_id}</span></p>

                        {/* CKD Progression Chart */}
                        {ckdRecords.length > 0 && (
                            <div className="mt-6">
                                <h5 className="text-lg font-semibold text-gray-700 mb-2">CKD Progression</h5>
                                <ResponsiveContainer width="100%" height={200}>
                                    <LineChart data={ckdRecords.map(ckd => ({
                                        date: new Date(ckd.created_at).toLocaleDateString(),
                                        gfr: parseFloat(ckd.value),
                                    }))}>
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Line type="monotone" dataKey="gfr" stroke="#2563eb" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        )}

                        {/* CKD Records Table */}
                        {ckdRecords.length > 0 ? (
                            <div className="mt-6 overflow-x-auto">
                                <h5 className="text-lg font-semibold text-gray-700 mb-2">CKD Records</h5>
                                <table className="w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-700">
                                            <th className="border border-gray-300 px-4 py-2">Date</th>
                                            <th className="border border-gray-300 px-4 py-2">GFR Value</th>
                                            <th className="border border-gray-300 px-4 py-2">Stage</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ckdRecords.map((ckd, i) => (
                                            <tr key={i} className="text-gray-800">
                                                <td className="border border-gray-300 px-4 py-2">{new Date(ckd.created_at).toLocaleDateString()}</td>
                                                <td className="border border-gray-300 px-4 py-2">{ckd.value}</td>
                                                <td className="border border-gray-300 px-4 py-2">{ckd.stage}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500 mt-4">No CKD records found for this client.</p>
                        )}
                    </div>

                    {/* CKD Calculator Section */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-lg font-medium mb-4">Add New CKD Record</h3>
                        <div className="space-y-4">
                            <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} className="block w-full p-2 border rounded-md" />
                            <select value={sex} onChange={(e) => setSex(e.target.value)} className="block w-full p-2 border rounded-md">
                                <option value="">Select Sex</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            <select value={ethnicity} onChange={(e) => setEthnicity(e.target.value)} className="block w-full p-2 border rounded-md">
                                <option value="">Select Ethnicity</option>
                                <option value="non-black">Non-Black</option>
                                <option value="black">Black</option>
                            </select>
                            <input type="number" placeholder="Serum Creatinine (μmol/L)" value={creatinine} onChange={(e) => setCreatinine(e.target.value)} className="block w-full p-2 border rounded-md" />

                            <button onClick={calculateGFR} className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">
                                Calculate GFR
                            </button>

                            {gfr && (
                                <button onClick={saveGFR} className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700 transition">
                                    Save GFR
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
