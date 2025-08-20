<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Inertia\Inertia;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Invoice::with(['customer', 'user', 'items.product'])
            ->latest('sale_date');

        // Filter by date range if provided
        if ($request->has(['start_date', 'end_date'])) {
            $query->whereBetween('sale_date', [$request->start_date, $request->end_date]);
        }

        // Filter by status if provided
        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        $invoices = $query->paginate(15);

        return Inertia::render('invoices/index', [
            'invoices' => $invoices,
            'filters' => $request->only(['start_date', 'end_date', 'status'])
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        $invoice->load(['customer', 'user', 'items.product.category', 'items.product.unit']);

        return Inertia::render('invoices/show', [
            'invoice' => $invoice
        ]);
    }
}