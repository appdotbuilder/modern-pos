import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="POS System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-lg border border-blue-200 bg-blue-50 px-6 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors dark:border-blue-800 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
                            >
                                📊 Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-white/50 transition-colors dark:text-gray-200 dark:hover:bg-gray-700"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-md"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-6xl lg:flex-row lg:items-center lg:gap-12">
                        <div className="flex-1 rounded-2xl bg-white p-8 shadow-xl lg:p-12 dark:bg-gray-800">
                            <div className="text-center lg:text-left">
                                <div className="mb-6">
                                    <span className="text-6xl">🏪</span>
                                </div>
                                <h1 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl dark:text-white">
                                    Modern Point of Sale System
                                </h1>
                                <p className="mb-8 text-lg text-gray-600 lg:text-xl dark:text-gray-300">
                                    Streamline your retail operations with our comprehensive POS solution featuring role-based access, inventory management, and real-time reporting.
                                </p>
                                
                                <div className="mb-8 grid gap-4 md:grid-cols-2">
                                    <div className="flex items-center gap-3 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                                        <span className="text-2xl">📱</span>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-green-800 dark:text-green-200">Cashier Interface</h3>
                                            <p className="text-sm text-green-600 dark:text-green-300">Barcode scanning & quick checkout</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                                        <span className="text-2xl">📊</span>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-blue-800 dark:text-blue-200">Sales Analytics</h3>
                                            <p className="text-sm text-blue-600 dark:text-blue-300">Real-time reports & insights</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
                                        <span className="text-2xl">📦</span>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-purple-800 dark:text-purple-200">Inventory Control</h3>
                                            <p className="text-sm text-purple-600 dark:text-purple-300">Stock tracking & management</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">
                                        <span className="text-2xl">👥</span>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-orange-800 dark:text-orange-200">Role Management</h3>
                                            <p className="text-sm text-orange-600 dark:text-orange-300">Admin, Cashier & Manager roles</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">Key Features</h3>
                                    <ul className="grid gap-2 text-left md:grid-cols-2">
                                        <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                            <span className="text-green-500">✓</span>
                                            Multiple payment methods
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                            <span className="text-green-500">✓</span>
                                            Customer management
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                            <span className="text-green-500">✓</span>
                                            Tax configuration
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                            <span className="text-green-500">✓</span>
                                            Product categories
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                            <span className="text-green-500">✓</span>
                                            Invoice generation
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                            <span className="text-green-500">✓</span>
                                            Supplier tracking
                                        </li>
                                    </ul>
                                </div>

                                {!auth.user && (
                                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                                        <Link
                                            href={route('register')}
                                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 transition-colors shadow-lg"
                                        >
                                            🚀 Start Free Trial
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-8 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                        >
                                            📝 Sign In
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-6 flex-1 lg:mb-0">
                            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 p-8 text-white shadow-xl">
                                <div className="mb-6 text-center">
                                    <span className="text-6xl">💰</span>
                                </div>
                                <h2 className="mb-4 text-2xl font-bold">Perfect for All Business Sizes</h2>
                                <div className="space-y-4">
                                    <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
                                        <h4 className="font-semibold">🏪 Small Retailers</h4>
                                        <p className="text-sm opacity-90">Simple checkout and inventory tracking</p>
                                    </div>
                                    <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
                                        <h4 className="font-semibold">🏬 Multi-store Chains</h4>
                                        <p className="text-sm opacity-90">Centralized management and reporting</p>
                                    </div>
                                    <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
                                        <h4 className="font-semibold">🍕 Restaurants & Cafes</h4>
                                        <p className="text-sm opacity-90">Fast order processing and table management</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <footer className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
                    Built with ❤️ using Laravel & React • Powered by{" "}
                    <a 
                        href="https://app.build" 
                        target="_blank" 
                        className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                    >
                        app.build
                    </a>
                </footer>
            </div>
        </>
    );
}