<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Customer;
use App\Models\Tax;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SalesController extends Controller
{
    /**
     * Display the sales/cashier interface.
     */
    public function index()
    {
        $products = Product::with(['category', 'unit'])
            ->active()
            ->get();
            
        $customers = Customer::active()->get();
        $taxes = Tax::active()->get();

        return Inertia::render('sales/index', [
            'products' => $products,
            'customers' => $customers,
            'taxes' => $taxes
        ]);
    }

    /**
     * Process a sale transaction.
     */
    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.discount_amount' => 'nullable|numeric|min:0',
            'customer_id' => 'nullable|exists:customers,id',
            'payment_method' => 'required|in:cash,card,digital_wallet,bank_transfer',
            'amount_paid' => 'required|numeric|min:0',
            'discount_amount' => 'nullable|numeric|min:0',
            'tax_amount' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
        ]);

        DB::transaction(function () use ($request) {
            // Calculate totals
            $subtotal = collect($request->items)->sum(function ($item) {
                return $item['quantity'] * $item['unit_price'] - ($item['discount_amount'] ?? 0);
            });

            $discountAmount = $request->discount_amount ?? 0;
            $taxAmount = $request->tax_amount ?? 0;
            $totalAmount = $subtotal + $taxAmount - $discountAmount;
            $changeAmount = max(0, $request->amount_paid - $totalAmount);

            // Create invoice
            $invoice = Invoice::create([
                'invoice_number' => 'INV-' . now()->format('YmdHis') . '-' . random_int(1000, 9999),
                'customer_id' => $request->customer_id,
                'user_id' => auth()->id(),
                'subtotal' => $subtotal,
                'tax_amount' => $taxAmount,
                'discount_amount' => $discountAmount,
                'total_amount' => $totalAmount,
                'payment_method' => $request->payment_method,
                'amount_paid' => $request->amount_paid,
                'change_amount' => $changeAmount,
                'status' => 'completed',
                'notes' => $request->notes,
                'sale_date' => now(),
            ]);

            // Create invoice items and update stock
            foreach ($request->items as $item) {
                InvoiceItem::create([
                    'invoice_id' => $invoice->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'discount_amount' => $item['discount_amount'] ?? 0,
                    'tax_amount' => ($item['tax_amount'] ?? 0),
                    'total_amount' => ($item['quantity'] * $item['unit_price']) - ($item['discount_amount'] ?? 0) + ($item['tax_amount'] ?? 0),
                ]);

                // Update product stock
                $product = Product::find($item['product_id']);
                $product->decrement('stock_quantity', $item['quantity']);
            }
        });

        return redirect()->route('sales.index')
            ->with('success', 'Sale processed successfully.');
    }
}