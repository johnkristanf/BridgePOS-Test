<?php

namespace Database\Seeders;

use App\Models\Departments;
use Illuminate\Database\Seeder;

class DepartmentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            config('departments.warehouse'),
            config('departments.store'),
        ];

        foreach ($departments as $department) {
            Departments::firstOrCreate(
                ['name' => $department],
                [
                    'name' => $department,
                ]
            );
        }
    }
}
