import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Sales', href: '/sales' },
];

interface Product {
    id: number;
    name: string;
    sku: string;
    barcode?: string;
    selling_price: string;
    stock_quantity: number;
    category: {
        name: string;
    };
    unit: {
        name: string;
        abbreviation: string;
    };
}

interface Customer {
    id: number;
    name: string;
    email?: string;
    phone?: string;
}

interface Tax {
    id: number;
    name: string;
    rate: string;
    is_active: boolean;
}

interface CartItem {
    product: Product;
    quantity: number;
    unit_price: number;
    discount_amount: number;
    total: number;
}

interface Props {
    products: Product[];
    customers: Customer[];
    taxes: Tax[];
    [key: string]: unknown;
}

export default function SalesIndex({ products, customers, taxes }: Props) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [barcodeInput, setBarcodeInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTax, setSelectedTax] = useState<Tax | null>(null);
    const [overallDiscount, setOverallDiscount] = useState(0);

    const { data, setData, post, processing } = useForm({
        items: [] as Array<{
            product_id: number;
            quantity: number;
            unit_price: number;
            discount_amount: number;
            tax_amount: number;
        }>,
        customer_id: null as number | null,
        payment_method: 'cash',
        amount_paid: 0,
        discount_amount: 0,
        tax_amount: 0,
        notes: '',
    });

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.barcode && product.barcode.includes(searchQuery))
    );

    const addToCart = (product: Product) => {
        const existingItem = cart.find(item => item.product.id === product.id);
        
        if (existingItem) {
            setCart(cart.map(item =>
                item.product.id === product.id
                    ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.unit_price }
                    : item
            ));
        } else {
            setCart([...cart, {
                product,
                quantity: 1,
                unit_price: parseFloat(product.selling_price),
                discount_amount: 0,
                total: parseFloat(product.selling_price)
            }]);
        }
    };

    const removeFromCart = (productId: number) => {
        setCart(cart.filter(item => item.product.id !== productId));
    };

    const updateQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        setCart(cart.map(item =>
            item.product.id === productId
                ? { ...item, quantity, total: quantity * item.unit_price - item.discount_amount }
                : item
        ));
    };



    const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = selectedTax ? (subtotal * parseFloat(selectedTax.rate)) / 100 : 0;
    const finalTotal = subtotal + taxAmount - overallDiscount;

    const handleBarcodeSearch = () => {
        const product = products.find(p => p.barcode === barcodeInput || p.sku === barcodeInput);
        if (product) {
            addToCart(product);
            setBarcodeInput('');
        }
    };

    const processPayment = () => {
        if (cart.length === 0) return;

        const items = cart.map(item => ({
            product_id: item.product.id,
            quantity: item.quantity,
            unit_price: item.unit_price,
            discount_amount: item.discount_amount,
            tax_amount: selectedTax ? (item.total * parseFloat(selectedTax.rate)) / 100 : 0,
        }));

        setData({
            ...data,
            items,
            customer_id: selectedCustomer?.id || null,
            discount_amount: overallDiscount,
            tax_amount: taxAmount,
        });

        post('/sales', {
            onSuccess: () => {
                setCart([]);
                setSelectedCustomer(null);
                setOverallDiscount(0);
                setSelectedTax(null);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales - Cashier Interface" />
            
            <div className="flex h-full">
                {/* Product Selection Area */}
                <div className="flex-1 p-6">
                    <h1 className="mb-6 text-2xl font-bold">🛒 Point of Sale</h1>
                    
                    {/* Barcode Scanner */}
                    <div className="mb-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="🔍 Scan barcode or enter SKU..."
                                value={barcodeInput}
                                onChange={(e) => setBarcodeInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleBarcodeSearch()}
                                className="flex-1 rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                            />
                            <button
                                onClick={handleBarcodeSearch}
                                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Product Search */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="🔍 Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                        />
                    </div>

                    {/* Product Grid */}
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => addToCart(product)}
                                className="cursor-pointer rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700"
                            >
                                <h3 className="font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{product.category.name}</p>
                                <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                                <p className="mt-2 text-lg font-bold text-green-600">${product.selling_price}</p>
                                <p className="text-xs text-gray-500">Stock: {product.stock_quantity} {product.unit.abbreviation}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cart & Checkout Area */}
                <div className="w-96 border-l bg-gray-50 p-6 dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="mb-4 text-xl font-bold">🛍️ Shopping Cart</h2>
                    
                    {/* Customer Selection */}
                    <div className="mb-4">
                        <select
                            value={selectedCustomer?.id || ''}
                            onChange={(e) => setSelectedCustomer(customers.find(c => c.id === parseInt(e.target.value)) || null)}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
                        >
                            <option value="">👤 Select Customer (Optional)</option>
                            {customers.map(customer => (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name} {customer.phone && `(${customer.phone})`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Cart Items */}
                    <div className="mb-4 max-h-64 overflow-y-auto space-y-2">
                        {cart.length === 0 ? (
                            <p className="text-center text-gray-500 py-8">Cart is empty</p>
                        ) : (
                            cart.map((item) => (
                                <div key={item.product.id} className="rounded-lg border bg-white p-3 dark:bg-gray-700 dark:border-gray-600">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-sm">{item.product.name}</h4>
                                            <p className="text-xs text-gray-500">${item.unit_price} each</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="text-red-500 hover:text-red-700 ml-2"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <div className="mt-2 flex items-center gap-2">
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value))}
                                            className="w-16 rounded px-2 py-1 text-sm border dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        <span className="text-sm">× ${item.unit_price.toFixed(2)}</span>
                                    </div>
                                    <div className="mt-1 flex items-center justify-between">
                                        <span className="text-sm font-semibold">${item.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Tax Selection */}
                    {cart.length > 0 && (
                        <>
                            <div className="mb-4">
                                <select
                                    value={selectedTax?.id || ''}
                                    onChange={(e) => setSelectedTax(taxes.find(t => t.id === parseInt(e.target.value)) || null)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
                                >
                                    <option value="">No Tax</option>
                                    {taxes.map(tax => (
                                        <option key={tax.id} value={tax.id}>
                                            {tax.name} ({tax.rate}%)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Overall Discount */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Overall Discount ($)</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={overallDiscount}
                                    onChange={(e) => setOverallDiscount(parseFloat(e.target.value) || 0)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
                                />
                            </div>

                            {/* Payment Method */}
                            <div className="mb-4">
                                <select
                                    value={data.payment_method}
                                    onChange={(e) => setData('payment_method', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
                                >
                                    <option value="cash">💵 Cash</option>
                                    <option value="card">💳 Card</option>
                                    <option value="digital_wallet">📱 Digital Wallet</option>
                                    <option value="bank_transfer">🏦 Bank Transfer</option>
                                </select>
                            </div>

                            {/* Amount Paid */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Amount Paid ($)</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={data.amount_paid}
                                    onChange={(e) => setData('amount_paid', parseFloat(e.target.value) || 0)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700"
                                />
                            </div>

                            {/* Total Calculation */}
                            <div className="mb-4 rounded-lg bg-gray-100 p-3 text-sm dark:bg-gray-700">
                                <div className="flex justify-between">
                                    <span>Subtotal:</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                {selectedTax && (
                                    <div className="flex justify-between">
                                        <span>Tax ({selectedTax.name}):</span>
                                        <span>${taxAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                {overallDiscount > 0 && (
                                    <div className="flex justify-between text-red-600">
                                        <span>Discount:</span>
                                        <span>-${overallDiscount.toFixed(2)}</span>
                                    </div>
                                )}
                                <hr className="my-2 dark:border-gray-600" />
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total:</span>
                                    <span>${finalTotal.toFixed(2)}</span>
                                </div>
                                {data.amount_paid >= finalTotal && data.amount_paid > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Change:</span>
                                        <span>${(data.amount_paid - finalTotal).toFixed(2)}</span>
                                    </div>
                                )}
                            </div>

                            {/* Process Payment Button */}
                            <button
                                onClick={processPayment}
                                disabled={processing || cart.length === 0 || data.amount_paid < finalTotal}
                                className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {processing ? '⏳ Processing...' : '💰 Complete Sale'}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}