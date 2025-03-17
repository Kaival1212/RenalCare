import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import axios from 'axios';

function Ckd_cal({ auth }) {
    const [age, setAge] = useState('');
    const [sex, setSex] = useState('male');
    const [creatinine, setCreatinine] = useState('');
    const [ethnicity, setEthnicity] = useState('non-black');
    const [gfr, setGfr] = useState(null);
    const [stage, setStage] = useState('');

    const calculateGFR = () => {
        if (!age || !creatinine) {
            alert("Please enter all values");
            return;
        }

        let creatValue = creatinine / 88.4;
        let sexFactor = sex === "female" ? 0.742 : 1;
        let ethnicityFactor = ethnicity === "black" ? 1.210 : 1;

        let gfrValue = 186 * Math.pow(creatValue, -1.154) * Math.pow(age, -0.203) * sexFactor * ethnicityFactor;
        setGfr(gfrValue.toFixed(2));

        let stageResult;
        if (gfrValue >= 90) stageResult = "Stage 1 (Normal)";
        else if (gfrValue >= 60) stageResult = "Stage 2 (Mild)";
        else if (gfrValue >= 30) stageResult = "Stage 3 (Moderate)";
        else if (gfrValue >= 15) stageResult = "Stage 4 (Severe)";
        else stageResult = "Stage 5 (Kidney Failure)";

        setStage(stageResult);
    };



    const saveGFR = async () => {
        try {
            const response = await axios.post(route("user-cdk.store"), {
                gfr: gfr,
                stage: stage
            });

            console.log("Success:", response.data.message);
            alert("GFR saved successfully!");
        } catch (error) {
            console.error("Error saving GFR:", error);
            alert(error.response?.data?.message || "Failed to save GFR.");
        }
    };




    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">CKD Calculator</h2>}
        >
            <Head title="CKD Calculator" />
            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium mb-4">Enter Details</h3>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Age</label>
                                <input
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Sex</label>
                                <select
                                    value={sex}
                                    onChange={(e) => setSex(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Ethnicity</label>
                                <select
                                    value={ethnicity}
                                    onChange={(e) => setEthnicity(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                                >
                                    <option value="non-black">Non-Black</option>
                                    <option value="black">Black</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Serum Creatinine (μmol/L)</label>
                                <input
                                    type="number"
                                    value={creatinine}
                                    onChange={(e) => setCreatinine(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
                                    required
                                />
                            </div>

                            <button
                                onClick={calculateGFR}
                                className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                            >
                                Calculate GFR
                            </button>

                            {gfr && (
                                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                                    <p className="text-lg font-semibold">eGFR: {gfr} mL/min/1.73m²</p>
                                    <p className="text-md">{stage}</p>
                                </div>
                            )}

                            {gfr && (
                                <button
                                    onClick={saveGFR}
                                    className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                                >
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

export default Ckd_cal
