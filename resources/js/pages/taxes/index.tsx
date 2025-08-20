import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Taxes', href: '/taxes' },
];

interface Tax {
    id: number;
    name: string;
    rate: string;
    description?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    taxes: {
        data: Tax[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function TaxesIndex({ taxes }: Props) {
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user?.role;
    const canManage = userRole === 'administrator';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={canManage ? "Tax Management" : "Tax Information"} />
            
            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">
                        🧮 {canManage ? "Tax Management" : "Tax Information"}
                    </h1>
                    {canManage && (
                        <Link
                            href="/taxes/create"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
                        >
                            ➕ Add Tax
                        </Link>
                    )}
                </div>

                {/* Taxes Table */}
                <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                        Rate
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                        Created
                                    </th>
                                    {canManage && (
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                            Actions
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                {taxes.data.map((tax) => (
                                    <tr key={tax.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {tax.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                                {parseFloat(tax.rate).toFixed(2)}%
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                                                {tax.description || '—'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                tax.is_active 
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                            }`}>
                                                {tax.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-white">
                                                {new Date(tax.created_at).toLocaleDateString()}
                                            </div>
                                        </td>
                                        {canManage && (
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                <Link
                                                    href={`/taxes/${tax.id}`}
                                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                >
                                                    👁️ View
                                                </Link>
                                                <Link
                                                    href={`/taxes/${tax.id}/edit`}
                                                    className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300"
                                                >
                                                    ✏️ Edit
                                                </Link>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {taxes.data.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm dark:bg-gray-800">
                        <div className="text-6xl mb-4">🧮</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2 dark:text-white">No taxes configured</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            {canManage 
                                ? "Create your first tax configuration to get started."
                                : "No tax configurations are currently available."
                            }
                        </p>
                        {canManage && (
                            <Link
                                href="/taxes/create"
                                className="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
                            >
                                ➕ Add Tax
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}