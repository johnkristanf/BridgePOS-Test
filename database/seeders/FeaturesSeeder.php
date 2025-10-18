<?php

namespace Database\Seeders;

use App\Models\Features;
use Illuminate\Database\Seeder;

class FeaturesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $features = [
            [
                'tag' => config('features.sales_t.tag'),
                'name' => config('features.sales_t.name'),
            ],
            [
                'tag' => config('features.cash.tag'),
                'name' => config('features.cash.name'),
            ],
            [
                'tag' => config('features.user_m.tag'),
                'name' => config('features.user_m.name'),
            ],
            [
                'tag' => config('features.customer_m.tag'),
                'name' => config('features.customer_m.name'),
            ],
            [
                'tag' => config('features.company.tag'),
                'name' => config('features.company.name'),
            ],
            [
                'tag' => config('features.transaction.tag'),
                'name' => config('features.transaction.name'),
            ],
            [
                'tag' => config('features.pricing.tag'),
                'name' => config('features.pricing.name'),
            ],
            [
                'tag' => config('features.warehouse_m.tag'),
                'name' => config('features.warehouse_m.name'),
            ],
        ];

        foreach ($features as $feature) {
            Features::create($feature);
        }
    }
}
