<?php

namespace Database\Seeders;

use App\Models\Permissions;
use Illuminate\Database\Seeder;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            config('permissions.read'),
            config('permissions.view'),
            config('permissions.create'),
            config('permissions.update'),
            config('permissions.delete'),
            config('permissions.print'),
            config('permissions.upload'),
        ];


        foreach ($permissions as $permission) {
            Permissions::create([
                'name'=> $permission,
            ]);
        }
    }
}
