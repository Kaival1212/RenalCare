import GuestLayout from '@/Layouts/GuestLayout';
import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

function SimpleCKDcal({ auth }) {
    const [age, setAge] = useState('');
    //const user = usePage().props.auth.user;
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

    return (
        <>
            <header className="flex justify-between w-full max-w-7xl px-4 py-4">
                <div className="flex items-center space-x-3" onClick={() => window.location.href = '/'}>
                    <svg
                        className="h-10 w-auto text-blue-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                            fill="currentColor"
                        />
                    </svg>
                    <span className="font-bold text-xl text-blue-600">RenalCare</span>
                </div>
                <nav className="flex items-center space-x-6">
                    {auth?.user ? (
                        <Link
                            href={route('dashboard')}
                            className="text-blue-600 hover:text-blue-800 font-medium transition duration-150"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="text-gray-700 hover:text-blue-600 font-medium transition duration-150"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </header>

            <Head title="CKD Calculator" />


            <GuestLayout>

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
                                        onClick={calculateGFR}
                                        className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                                    >
                                        Save GFR
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </GuestLayout>
        </>
    );
}

export default SimpleCKDcal
