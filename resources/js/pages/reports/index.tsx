import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Reports', href: '/reports' },
];

interface SalesSummary {
    total_transactions: number;
    total_revenue: string;
    total_tax: string;
    total_discounts: string;
    average_transaction: string;
}

interface DailySale {
    date: string;
    transactions: number;
    revenue: string;
}

interface TopProduct {
    product_id: number;
    total_quantity: number;
    total_revenue: string;
    product: {
        name: string;
        sku: string;
    };
}

interface PaymentMethod {
    payment_method: string;
    count: number;
    revenue: string;
}

interface Props {
    salesSummary: SalesSummary;
    dailySales: DailySale[];
    topProducts: TopProduct[];
    paymentMethods: PaymentMethod[];
    filters: {
        start_date: string;
        end_date: string;
    };
    [key: string]: unknown;
}

export default function ReportsIndex({ salesSummary, dailySales, topProducts, paymentMethods, filters }: Props) {
    const formatCurrency = (amount: string | number) => {
        return parseFloat(amount.toString()).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    const getPaymentMethodIcon = (method: string) => {
        switch (method) {
            case 'cash': return '💵';
            case 'card': return '💳';
            case 'digital_wallet': return '📱';
            case 'bank_transfer': return '🏦';
            default: return '💰';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales Reports" />
            
            <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">📊 Sales Reports</h1>
                </div>

                {/* Date Filter */}
                <div className="mb-6 rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
                    <div className="flex gap-4 items-end">
                        <div>
                            <label className="block text-sm font-medium mb-1">Start Date</label>
                            <input
                                type="date"
                                defaultValue={filters.start_date}
                                className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">End Date</label>
                            <input
                                type="date"
                                defaultValue={filters.end_date}
                                className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
                            />
                        </div>
                        <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                            Update Report
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg bg-white p-6 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                                <p className="text-2xl font-bold text-green-600">{formatCurrency(salesSummary.total_revenue)}</p>
                            </div>
                            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                                <span className="text-2xl">💰</span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Transactions</p>
                                <p className="text-2xl font-bold text-blue-600">{salesSummary.total_transactions}</p>
                            </div>
                            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/20">
                                <span className="text-2xl">🧾</span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Sale</p>
                                <p className="text-2xl font-bold text-purple-600">{formatCurrency(salesSummary.average_transaction)}</p>
                            </div>
                            <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/20">
                                <span className="text-2xl">📈</span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow-sm border dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tax</p>
                                <p className="text-2xl font-bold text-orange-600">{formatCurrency(salesSummary.total_tax)}</p>
                            </div>
                            <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900/20">
                                <span className="text-2xl">🏛️</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Daily Sales Chart */}
                    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                        <h2 className="mb-4 text-xl font-bold">📅 Daily Sales</h2>
                        <div className="space-y-3">
                            {dailySales.slice(-7).map((day, dayIndex) => (
                                <div key={`${day.date}-${dayIndex}`} className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                                    <div>
                                        <div className="font-medium">{new Date(day.date).toLocaleDateString()}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {day.transactions} transactions
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-green-600">
                                            {formatCurrency(day.revenue)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Products */}
                    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                        <h2 className="mb-4 text-xl font-bold">🏆 Top Products</h2>
                        <div className="space-y-3">
                            {topProducts.map((product, productIndex) => (
                                <div key={product.product_id} className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-blue-100 px-2 py-1 text-xs font-bold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                            #{productIndex + 1}
                                        </div>
                                        <div>
                                            <div className="font-medium">{product.product.name}</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Qty: {product.total_quantity}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-green-600">
                                            {formatCurrency(product.total_revenue)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                    <h2 className="mb-4 text-xl font-bold">💳 Payment Methods</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {paymentMethods.map((method, methodIndex) => (
                            <div key={`${method.payment_method}-${methodIndex}`} className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xl">{getPaymentMethodIcon(method.payment_method)}</span>
                                    <span className="font-medium capitalize">
                                        {method.payment_method.replace('_', ' ')}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {method.count} transactions
                                </div>
                                <div className="font-bold text-green-600">
                                    {formatCurrency(method.revenue)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Additional Analytics */}
                <div className="mt-6 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
                    <h2 className="mb-4 text-xl font-bold">📈 Financial Breakdown</h2>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                            <div className="text-green-800 dark:text-green-200">
                                <div className="font-medium">Gross Revenue</div>
                                <div className="text-2xl font-bold">{formatCurrency(salesSummary.total_revenue)}</div>
                            </div>
                        </div>
                        <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                            <div className="text-blue-800 dark:text-blue-200">
                                <div className="font-medium">Tax Collected</div>
                                <div className="text-2xl font-bold">{formatCurrency(salesSummary.total_tax)}</div>
                            </div>
                        </div>
                        <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                            <div className="text-red-800 dark:text-red-200">
                                <div className="font-medium">Discounts Given</div>
                                <div className="text-2xl font-bold">{formatCurrency(salesSummary.total_discounts)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}