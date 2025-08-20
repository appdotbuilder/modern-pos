<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class ReportController extends Controller
{
    /**
     * Display sales reports.
     */
    public function index(Request $request)
    {
        $startDate = $request->input('start_date', Carbon::now()->startOfMonth()->toDateString());
        $endDate = $request->input('end_date', Carbon::now()->endOfDay()->toDateString());

        // Sales Summary
        $salesSummary = Invoice::whereBetween('sale_date', [$startDate, $endDate])
            ->selectRaw('
                COUNT(*) as total_transactions,
                SUM(total_amount) as total_revenue,
                SUM(tax_amount) as total_tax,
                SUM(discount_amount) as total_discounts,
                AVG(total_amount) as average_transaction
            ')
            ->first();

        // Daily Sales
        $dailySales = Invoice::whereBetween('sale_date', [$startDate, $endDate])
            ->selectRaw('DATE(sale_date) as date, COUNT(*) as transactions, SUM(total_amount) as revenue')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Top Products
        $topProducts = InvoiceItem::whereHas('invoice', function($query) use ($startDate, $endDate) {
                $query->whereBetween('sale_date', [$startDate, $endDate]);
            })
            ->with('product')
            ->selectRaw('product_id, SUM(quantity) as total_quantity, SUM(total_amount) as total_revenue')
            ->groupBy('product_id')
            ->orderByDesc('total_revenue')
            ->limit(10)
            ->get();

        // Payment Methods
        $paymentMethods = Invoice::whereBetween('sale_date', [$startDate, $endDate])
            ->selectRaw('payment_method, COUNT(*) as count, SUM(total_amount) as revenue')
            ->groupBy('payment_method')
            ->get();

        return Inertia::render('reports/index', [
            'salesSummary' => $salesSummary,
            'dailySales' => $dailySales,
            'topProducts' => $topProducts,
            'paymentMethods' => $paymentMethods,
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ]
        ]);
    }
}