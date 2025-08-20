<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\Tax;
use App\Models\Unit;
use App\Models\User;
use Illuminate\Database\Seeder;

class POSSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create users with different roles
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@pos.com',
            'role' => 'administrator',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Cashier User',
            'email' => 'cashier@pos.com',
            'role' => 'cashier',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Manager User',
            'email' => 'manager@pos.com',
            'role' => 'manager',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
        ]);

        // Create taxes
        $taxes = [
            ['name' => 'VAT', 'rate' => 20.00, 'description' => 'Value Added Tax'],
            ['name' => 'Sales Tax', 'rate' => 8.50, 'description' => 'State Sales Tax'],
            ['name' => 'Service Tax', 'rate' => 5.00, 'description' => 'Service Tax'],
        ];

        foreach ($taxes as $tax) {
            Tax::create($tax);
        }

        // Create units
        $units = [
            ['name' => 'Piece', 'abbreviation' => 'pc', 'description' => 'Individual pieces'],
            ['name' => 'Kilogram', 'abbreviation' => 'kg', 'description' => 'Weight in kilograms'],
            ['name' => 'Liter', 'abbreviation' => 'L', 'description' => 'Volume in liters'],
            ['name' => 'Meter', 'abbreviation' => 'm', 'description' => 'Length in meters'],
            ['name' => 'Box', 'abbreviation' => 'box', 'description' => 'Items sold by box'],
        ];

        foreach ($units as $unit) {
            Unit::create($unit);
        }

        // Create categories
        $categories = [
            ['name' => 'Electronics', 'description' => 'Electronic devices and accessories'],
            ['name' => 'Clothing', 'description' => 'Apparel and fashion items'],
            ['name' => 'Food & Beverages', 'description' => 'Food items and drinks'],
            ['name' => 'Books', 'description' => 'Books and educational materials'],
            ['name' => 'Home & Garden', 'description' => 'Home improvement and garden items'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        // Create suppliers
        $suppliers = [
            [
                'name' => 'TechSupplier Inc.',
                'contact_person' => 'John Doe',
                'email' => 'contact@techsupplier.com',
                'phone' => '+1-555-0101',
                'address' => '123 Tech Street, Silicon Valley, CA',
            ],
            [
                'name' => 'Fashion World Ltd.',
                'contact_person' => 'Jane Smith',
                'email' => 'orders@fashionworld.com',
                'phone' => '+1-555-0202',
                'address' => '456 Fashion Ave, New York, NY',
            ],
        ];

        foreach ($suppliers as $supplier) {
            Supplier::create($supplier);
        }

        // Create customers
        $customers = [
            [
                'name' => 'John Customer',
                'email' => 'john@example.com',
                'phone' => '+1-555-1001',
                'address' => '789 Customer Lane, Anytown, USA',
            ],
            [
                'name' => 'Jane Buyer',
                'email' => 'jane@example.com',
                'phone' => '+1-555-1002',
                'address' => '321 Buyer Street, Somewhere, USA',
            ],
            [
                'name' => 'Bob Client',
                'phone' => '+1-555-1003',
                'address' => '654 Client Road, Elsewhere, USA',
            ],
        ];

        foreach ($customers as $customer) {
            Customer::create($customer);
        }

        // Create products
        $products = [
            [
                'name' => 'Smartphone X1',
                'sku' => 'PHONE-X1-001',
                'barcode' => '1234567890123',
                'description' => 'Latest smartphone with advanced features',
                'category_id' => 1, // Electronics
                'unit_id' => 1, // Piece
                'supplier_id' => 1,
                'cost_price' => 500.00,
                'selling_price' => 699.99,
                'stock_quantity' => 50,
                'min_stock_level' => 5,
            ],
            [
                'name' => 'Cotton T-Shirt',
                'sku' => 'CLOTH-TS-001',
                'barcode' => '2234567890123',
                'description' => '100% cotton comfortable t-shirt',
                'category_id' => 2, // Clothing
                'unit_id' => 1, // Piece
                'supplier_id' => 2,
                'cost_price' => 15.00,
                'selling_price' => 29.99,
                'stock_quantity' => 100,
                'min_stock_level' => 10,
            ],
            [
                'name' => 'Coffee Premium Blend',
                'sku' => 'FOOD-COF-001',
                'barcode' => '3234567890123',
                'description' => 'Premium coffee blend 1kg',
                'category_id' => 3, // Food & Beverages
                'unit_id' => 2, // Kilogram
                'cost_price' => 12.00,
                'selling_price' => 19.99,
                'stock_quantity' => 25,
                'min_stock_level' => 5,
            ],
            [
                'name' => 'Programming Guide',
                'sku' => 'BOOK-PRG-001',
                'barcode' => '4234567890123',
                'description' => 'Complete programming guide for beginners',
                'category_id' => 4, // Books
                'unit_id' => 1, // Piece
                'cost_price' => 25.00,
                'selling_price' => 39.99,
                'stock_quantity' => 30,
                'min_stock_level' => 3,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}