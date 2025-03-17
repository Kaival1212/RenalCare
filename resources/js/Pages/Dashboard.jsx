import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function Dashboard({ clients }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold leading-tight text-gray-800">
                        Clinic Dashboard
                    </h2>

                    <Link href={route("upload-multiple")} className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition duration-300">
                        Add multiple clients
                    </Link>
                </div>

            }
        >
            <Head title="Dashboard" />

            <div className="py-6 px-4">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Client CKD Overview
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {clients.map((client, index) => (
                            <Link href={route("client.show", { "id": client.id })} key={index} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">

                                <h4 className="text-lg font-semibold text-blue-600 truncate">{client.name}</h4>
                                <p className="text-gray-700 text-sm truncate">📧 {client.email}</p>

                                <p className="text-gray-700 text-sm">
                                    🩺 CKD Records: <span className="font-bold">{client.cdk.length}</span>
                                </p>

                                {client.cdk.length > 0 && (
                                    <div className="mt-2">
                                        <h5 className="text-sm font-semibold text-gray-700 mb-1">CKD Progression</h5>
                                        <ResponsiveContainer width="100%" height={150}>
                                            <LineChart data={client.cdk.map(ckd => ({
                                                date: new Date(ckd.created_at).toLocaleDateString(),
                                                gfr: parseFloat(ckd.value),
                                            }))}>
                                                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                                                <YAxis tick={{ fontSize: 10 }} />
                                                <Tooltip />
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <Line type="monotone" dataKey="gfr" stroke="#2563eb" strokeWidth={2} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}





























// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head } from '@inertiajs/react';
// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

// export default function Dashboard({ clients }) {
//     return (
//         <AuthenticatedLayout
//             header={
//                 <h2 className="text-2xl font-bold leading-tight text-gray-800">
//                     Client Overview
//                 </h2>
//             }
//         >
//             <Head title="Dashboard" />

//             <div className="py-12 px-6">
//                 <div className="max-w-7xl mx-auto">
//                     <h3 className="text-lg font-semibold text-gray-700 mb-6">
//                         Client & CKD Information
//                     </h3>

//                     {clients.map((client, index) => (
//                         <div key={index} className="mb-10 p-6 bg-white rounded-lg shadow-md">
//                             {/* Client Info */}
//                             <h4 className="text-xl font-semibold text-blue-600">{client.name}</h4>
//                             <p className="text-gray-700 mt-1">Email: <span className="text-gray-800 font-medium">{client.email}</span></p>
//                             <p className="text-gray-700">Clinic ID: <span className="text-gray-800 font-medium">{client.clinic_id}</span></p>

//                             {/* CKD Trend Line Chart */}
//                             {client.cdk.length > 0 && (
//                                 <div className="mt-6">
//                                     <h5 className="text-lg font-semibold text-gray-700 mb-2">CKD Progression</h5>
//                                     <ResponsiveContainer width="100%" height={300}>
//                                         <LineChart data={client.cdk.map(ckd => ({
//                                             date: new Date(ckd.created_at).toLocaleDateString(),
//                                             gfr: parseFloat(ckd.value),
//                                         }))}>
//                                             <XAxis dataKey="date" />
//                                             <YAxis />
//                                             <Tooltip />
//                                             <CartesianGrid strokeDasharray="3 3" />
//                                             <Line type="monotone" dataKey="gfr" stroke="#2563eb" strokeWidth={2} />
//                                         </LineChart>
//                                     </ResponsiveContainer>
//                                 </div>
//                             )}

//                             {/* CKD Records Table */}
//                             {client.cdk.length > 0 ? (
//                                 <div className="mt-6 overflow-x-auto">
//                                     <h5 className="text-lg font-semibold text-gray-700 mb-2">CKD Records</h5>
//                                     <table className="w-full border-collapse border border-gray-300">
//                                         <thead>
//                                             <tr className="bg-gray-100 text-gray-700">
//                                                 <th className="border border-gray-300 px-4 py-2">Date</th>
//                                                 <th className="border border-gray-300 px-4 py-2">GFR Value</th>
//                                                 <th className="border border-gray-300 px-4 py-2">Stage</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {client.cdk.map((ckd, i) => (
//                                                 <tr key={i} className="text-gray-800">
//                                                     <td className="border border-gray-300 px-4 py-2">{new Date(ckd.created_at).toLocaleDateString()}</td>
//                                                     <td className="border border-gray-300 px-4 py-2">{ckd.value}</td>
//                                                     <td className="border border-gray-300 px-4 py-2">{ckd.stage}</td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             ) : (
//                                 <p className="text-gray-500 mt-4">No CKD records found for this client.</p>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }
