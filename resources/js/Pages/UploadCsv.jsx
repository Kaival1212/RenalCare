import React, { useState } from "react";
import Papa from "papaparse";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function UploadCsv() {
    const [csvData, setCsvData] = useState([]);
    const [error, setError] = useState("");

    // Function to calculate eGFR
    const calculateGFR = (creatinine, gender, birthYear, ethnicity) => {
        const currentYear = new Date().getFullYear();
        const age = currentYear - parseInt(birthYear, 10);

        // Ensure valid numbers
        if (isNaN(creatinine) || isNaN(age) || age <= 0 || creatinine <= 0) {
            return { gfr: "Invalid", stage: "Invalid Data" };
        }

        const creatValue = parseFloat(creatinine) / 88.4; // Convert μmol/L to mg/dL
        const sexFactor = gender === "1" || gender.toLowerCase().trim() === "female" ? 0.742 : 1;
        const ethnicityFactor = ethnicity.toLowerCase().trim() === "b" || ethnicity.toLowerCase() === "black" ? 1.210 : 1;

        let gfr = 186 * Math.pow(creatValue, -1.154) * Math.pow(age, -0.203) * sexFactor * ethnicityFactor;
        gfr = gfr.toFixed(2);

        let stage = "";
        if (gfr >= 90) stage = "Stage 1 (Normal)";
        else if (gfr >= 60) stage = "Stage 2 (Mild)";
        else if (gfr >= 30) stage = "Stage 3 (Moderate)";
        else if (gfr >= 15) stage = "Stage 4 (Severe)";
        else stage = "Stage 5 (Kidney Failure)";

        return { gfr, stage };
    };

    // Function to clean and validate CSV data
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.name.endsWith(".csv")) {
            setError("Please upload a valid CSV file.");
            return;
        }

        Papa.parse(file, {
            complete: (result) => {
                if (result.errors.length) {
                    setError("Error parsing the CSV file. Please check the format.");
                    return;
                }

                const processedData = result.data.slice(1).map((row) => {
                    if (row.length < 5) return null; // Ignore incomplete rows

                    let [patientID, gender, birthYear, ethnicity, creatinine] = row.map((col) => col.trim());

                    // Convert numeric fields
                    const parsedCreatinine = parseFloat(creatinine);
                    const parsedBirthYear = parseInt(birthYear, 10);

                    // Validate values
                    if (!patientID || isNaN(parsedCreatinine) || isNaN(parsedBirthYear) || parsedCreatinine <= 0 || parsedBirthYear <= 1900) {
                        return null;
                    }

                    // Ensure gender is correctly mapped
                    gender = gender === "1" || gender.toLowerCase() === "female" ? "Female" : "Male";

                    // Ensure ethnicity is mapped correctly
                    ethnicity = ethnicity.toLowerCase() === "b" || ethnicity.toLowerCase() === "black" ? "Black" : "Other";

                    const { gfr, stage } = calculateGFR(parsedCreatinine, gender, birthYear, ethnicity);

                    return { patientID, gender, birthYear, ethnicity, creatinine: parsedCreatinine, gfr, stage };
                }).filter(Boolean); // Remove null values

                if (processedData.length === 0) {
                    setError("No valid data found in the CSV file.");
                    return;
                }

                setCsvData(processedData);
                setError("");
            },
            header: false,
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="py-12 px-6 max-w-5xl mx-auto">
                <div className="bg-white shadow-lg p-6 rounded-lg">
                    <h2 className="text-xl font-bold text-gray-800">Bulk eGFR Calculator</h2>

                    <div className="mt-4">
                        <label htmlFor="csv-upload" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition">
                            Upload CSV
                        </label>
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="csv-upload"
                        />
                    </div>

                    {error && <p className="text-red-600 mt-4">{error}</p>}
                </div>

                {/* Display results immediately after file upload */}
                {csvData.length > 0 && (
                    <div className="mt-6 bg-white shadow-md p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700">eGFR Results</h3>
                        <table className="w-full mt-4 border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700">
                                    <th className="border border-gray-300 px-4 py-2">Patient ID</th>
                                    <th className="border border-gray-300 px-4 py-2">Gender</th>
                                    <th className="border border-gray-300 px-4 py-2">Year of Birth</th>
                                    <th className="border border-gray-300 px-4 py-2">Ethnicity</th>
                                    <th className="border border-gray-300 px-4 py-2">Creatinine (μmol/L)</th>
                                    <th className="border border-gray-300 px-4 py-2">eGFR</th>
                                    <th className="border border-gray-300 px-4 py-2">Stage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {csvData.map((patient, index) => (
                                    <tr key={index} className="text-gray-800">
                                        <td className="border border-gray-300 px-4 py-2">{patient.patientID}</td>
                                        <td className="border border-gray-300 px-4 py-2">{patient.gender}</td>
                                        <td className="border border-gray-300 px-4 py-2">{patient.birthYear}</td>
                                        <td className="border border-gray-300 px-4 py-2">{patient.ethnicity}</td>
                                        <td className="border border-gray-300 px-4 py-2">{patient.creatinine}</td>
                                        <td className="border border-gray-300 px-4 py-2">{patient.gfr} mL/min/1.73m²</td>
                                        <td className="border border-gray-300 px-4 py-2">{patient.stage}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
