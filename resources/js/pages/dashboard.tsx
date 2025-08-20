import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Welcome Section */}
                <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white shadow-lg">
                    <h1 className="text-2xl font-bold">Welcome back, {user?.name}! 👋</h1>
                    <p className="mt-2 text-blue-100">
                        Role: <span className="font-semibold capitalize">{user?.role}</span>
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl bg-white p-6 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Sales</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">$2,340</p>
                            </div>
                            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                                <span className="text-2xl">💰</span>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-6 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Transactions</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">47</p>
                            </div>
                            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/20">
                                <span className="text-2xl">🧾</span>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white p-6 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock Items</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
                            </div>
                            <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900/20">
                                <span className="text-2xl">📦</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Sales Interface */}
                    <div className="rounded-xl bg-white p-6 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">🏪 Point of Sale</h2>
                        <p className="mb-4 text-gray-600 dark:text-gray-400">
                            Process sales, scan barcodes, and handle customer transactions
                        </p>
                        <Link
                            href="/sales"
                            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                        >
                            Open Cashier Interface 🛒
                        </Link>
                    </div>

                    {/* Quick Management */}
                    <div className="rounded-xl bg-white p-6 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">⚙️ Quick Management</h2>
                        <div className="space-y-3">
                            {user?.role === 'administrator' && (
                                <>
                                    <Link
                                        href="/products"
                                        className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 text-sm hover:bg-gray-100 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
                                    >
                                        <span>📦</span>
                                        <span>Manage Products</span>
                                    </Link>
                                    <Link
                                        href="/customers"
                                        className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 text-sm hover:bg-gray-100 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
                                    >
                                        <span>👥</span>
                                        <span>Manage Customers</span>
                                    </Link>
                                </>
                            )}
                            <Link
                                href="/invoices"
                                className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 text-sm hover:bg-gray-100 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
                            >
                                <span>🧾</span>
                                <span>View Invoices</span>
                            </Link>
                            {(user?.role === 'administrator' || user?.role === 'manager') && (
                                <Link
                                    href="/reports"
                                    className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 text-sm hover:bg-gray-100 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
                                >
                                    <span>📊</span>
                                    <span>Sales Reports</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Role-specific Information */}
                <div className="rounded-xl bg-white p-6 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">📋 Your Access Level</h2>
                    {user?.role === 'administrator' && (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400">As an <strong>Administrator</strong>, you have full access to:</p>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-4">
                                <li>Tax Management (Create, Edit, Delete)</li>
                                <li>Category Management (Create, Edit, Delete)</li>
                                <li>Product Management (Create, Edit, Delete)</li>
                                <li>Unit Management (Create, Edit, Delete)</li>
                                <li>Supplier Management</li>
                                <li>Customer Management</li>
                                <li>Invoice List & Sales Interface</li>
                                <li>Order Reports</li>
                            </ul>
                        </div>
                    )}
                    {user?.role === 'cashier' && (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400">As a <strong>Cashier</strong>, you can access:</p>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-4">
                                <li>Sales Interface (Process transactions)</li>
                                <li>Barcode scanning</li>
                                <li>Customer checkout</li>
                                <li>Payment processing</li>
                            </ul>
                        </div>
                    )}
                    {user?.role === 'manager' && (
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400">As a <strong>Manager/Owner</strong>, you can access:</p>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-4">
                                <li>View Tax, Category, Product & Unit information</li>
                                <li>Invoice List</li>
                                <li>Order Reports & Analytics</li>
                                <li>Business performance insights</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}