<?php

namespace Database\Seeders;

use App\Models\Roles;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'code' => config('roles.sales_officer.code'),
                'name' => config('roles.sales_officer.name'),
            ],

            [
                'code' => config('roles.cashier.code'),
                'name' => config('roles.cashier.name'),
            ],

            [
                'code' => config('roles.coordinator.code'),
                'name' => config('roles.coordinator.name'),
            ],

            [
                'code' => config('roles.mco_head.code'),
                'name' => config('roles.mco_head.name'),
            ],

            [
                'code' => config('roles.merchandiser.code'),
                'name' => config('roles.merchandiser.name'),
            ],

            [
                'code' => config('roles.warehouse_officer.code'),
                'name' => config('roles.warehouse_officer.name'),
            ],

            [
                'code' => config('roles.evp.code'),
                'name' => config('roles.evp.name'),
            ],
        ];

        foreach ($roles as $role) {
            Roles::firstOrCreate($role, $role);
        }
    }
}
