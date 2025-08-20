<?php

use App\Http\Controllers\TaxController;
use App\Http\Controllers\SalesController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Sales/POS routes (available to all roles)
    Route::get('/sales', [SalesController::class, 'index'])->name('sales.index');
    Route::post('/sales', [SalesController::class, 'store'])->name('sales.store');

    // Invoice routes (available to all roles)
    Route::get('/invoices', [InvoiceController::class, 'index'])->name('invoices.index');
    Route::get('/invoices/{invoice}', [InvoiceController::class, 'show'])->name('invoices.show');

    // Reports (available to administrators and managers)
    Route::get('/reports', [ReportController::class, 'index'])
        ->name('reports.index');

    // Administrator-only routes
    Route::middleware(['can:administrator-access'])->group(function () {
        Route::resource('taxes', TaxController::class);
        // Add other admin-only routes here
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
