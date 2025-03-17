import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, appVersion, phpVersion }) {
    return (
        <>
            <Head title="RenalCare - CKD Management" />
            <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
                <div className="relative min-h-screen flex flex-col items-center px-6 py-8">
                    <header className="flex justify-between w-full max-w-7xl px-4 py-4">
                        <div className="flex items-center space-x-3">
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

                    <div className="text-center mt-16 mb-12">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">CKD Management</h1>
                        <p className="text-md text-gray-600 max-w-2xl mx-auto">
                            Chronic Kidney Disease (CKD) is a long-term condition where the kidneys gradually lose their ability to filter waste and excess fluids from the blood. This can lead to a build-up of harmful substances in the body, affecting overall health. CKD may result from conditions like diabetes, high blood pressure, or infections, and it can progress to kidney failure if not managed. Symptoms often don't appear until the disease is advanced, but they can include fatigue, swelling, and changes in urine output.
                        </p>
                    </div>

                    <main className="w-full max-w-7xl">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition duration-300 flex flex-col">
                                <div className="mb-4 text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">Early Detection</h2>
                                <p className="text-gray-600 mb-6 flex-grow">
                                    Identify at-risk patients earlier with our comprehensive screening tools and automated alerts.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition duration-300 flex flex-col">
                                <div className="mb-4 text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">Cardiovascular Risk Assessment</h2>
                                <p className="text-gray-600 mb-6 flex-grow">
                                    Identify modifiable risk factors and develop personalized intervention strategies to improve patient outcomes.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition duration-300 flex flex-col">
                                <div className="mb-4 text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">Patient Resources</h2>
                                <p className="text-gray-600 mb-6 flex-grow">
                                    Access tailored educational materials and self-management tools designed specifically for CKD patients.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center mt-10 w-full ">
                            <Link
                                href={route('login')}
                                className="bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 transform hover:scale-105"
                            >
                                Try it without an account
                            </Link>
                        </div>


                    </main>

                </div>
            </div>
        </>
    );
}
