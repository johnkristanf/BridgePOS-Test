<?php

namespace Database\Seeders;

use App\Models\Departments;
use App\Models\Features;
use App\Models\Permissions;
use App\Models\Roles;
use App\Models\User;
use DB;
use Hash;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pluck all user attribute related data
        $roles = Roles::pluck('id', 'code')->toArray();
        $departments = Departments::pluck('id', 'name')->toArray();
        $features = Features::pluck('id', 'tag')->toArray();
        $permissions = Permissions::pluck('id', 'name')->toArray();


        // Sales Officer
        $salesOfficer1 = User::create([
            'first_name' => 'Hazel',
            'last_name' => 'Uyanguren',
            'email' => 'salesofficer1@example.com',
            'password' => Hash::make('123456789'),
            'department_id' => $departments[config('departments.store')],
        ]);

        $salesOfficer2 = User::create([
            'first_name' => 'Roby Khris Michael',
            'last_name' => 'Batiao',
            'email' => 'salesofficer2@example.com',
            'password' => Hash::make('123456789'),
            'department_id' => $departments[config('departments.store')],

        ]);

        $salesOfficer3 = User::create([
            'first_name' => 'Niel Ian',
            'last_name' => 'Sawila',
            'email' => 'salesofficer3@example.com',
            'password' => Hash::make('123456789'),
            'department_id' => $departments[config('departments.store')],

        ]);

        $salesOfficer4 = User::create([
            'first_name' => 'Dexter',
            'last_name' => 'Senangote',
            'email' => 'salesofficer4@example.com',
            'password' => Hash::make('123456789'),
            'department_id' => $departments[config('departments.store')],

        ]);

        $salesOfficer5 = User::create([
            'first_name' => 'Mac Art Del Morr',
            'last_name' => 'Zembrano',
            'email' => 'salesofficer5@example.com',
            'password' => Hash::make('123456789'),
            'department_id' => $departments[config('departments.store')],

        ]);

        // Cashier
        $cashier1 = User::create([
            'first_name' => 'Monabel',
            'last_name' => 'Taleon',
            'email' => 'cashier1@example.com',
            'password' => Hash::make('123456789'),
            'department_id' => $departments[config('departments.store')],

        ]);

        // Coordinator
        $coordinator1 = User::create([
            'first_name' => 'Giecris',
            'last_name' => 'Genterone',
            'email' => 'coordinator1@example.com',
            'password' => Hash::make('123456789'),
            'department_id' => $departments[config('departments.store')],

        ]);

        // MCO Head
        $mcoHead1 = User::create([
            'first_name' => 'Laureece Mae',
            'last_name' => 'Lumaad',
            'email' => 'mcohead1@example.com',
            'password' => Hash::make('123456789'),
            'department_id' => $departments[config('departments.store')],

        ]);

        // Executive Vice President
        $evp1 = User::create([
            'first_name' => 'Cres Marie',
            'last_name' => 'Galang-Ferrer',
            'email' => 'evp1@example.com',
            'password' => Hash::make('123456789'),
            'department_id' => $departments[config('departments.store')],

        ]);

        // Merchandiser
        $merchandiser1 = User::create([
            'first_name' => 'Tony',
            'last_name' => 'Andres',
            'email' => 'merchandiser1@example.com',
            'password' => Hash::make('123456789'),
            'department_id' => $departments[config('departments.store')],

        ]);

        // Warehouse Officer
        $warehouseOfficer1 = User::create([
            'first_name' => 'Bryan',
            'last_name' => 'Gegremosa',
            'email' => 'warehouseofficer1@example.com',
            'password' => Hash::make('123456789'),
            'department_id' => $departments[config('departments.store')],

        ]);

        // Warehouse Officer
        $warehouseOfficer2 = User::create([
            'first_name' => 'Melvin',
            'last_name' => 'Garcia',
            'email' => 'warehouseofficer2@example.com',
            'password' => Hash::make('123456789'),
            'department_id' => $departments[config('departments.warehouse')],
        ]);

        $userRolesFeaturePermissions = [
            [
                'user' => $salesOfficer1,
                'role_code' => config('roles.sales_officer.code'),
                'features_permissions' => [
                    [
                        'feature_tag' => config('features.sales_t.tag'),
                        'permissions' => [
                            config('permissions.read'),
                            config('permissions.view'),
                            config('permissions.create'),
                            config('permissions.print'),
                        ],

                    ],
                ],
            ],
            [
                'user' => $salesOfficer2,
                'role_code' => config('roles.sales_officer.code'),
                'features_permissions' => [
                    [
                        'feature_tag' => config('features.sales_t.tag'),
                        'permissions' => [
                            config('permissions.read'),
                            config('permissions.view'),
                            config('permissions.create'),
                            config('permissions.print'),
                        ],

                    ],
                ],
            ],

            [
                'user' => $salesOfficer3,
                'role_code' => config('roles.sales_officer.code'),
                'features_permissions' => [
                    [
                        'feature_tag' => config('features.sales_t.tag'),
                        'permissions' => [
                            config('permissions.read'),
                            config('permissions.view'),
                            config('permissions.create'),
                            config('permissions.print'),
                        ],

                    ],
                ],
            ],

            [
                'user' => $salesOfficer4,
                'role_code' => config('roles.sales_officer.code'),
                'features_permissions' => [
                    [
                        'feature_tag' => config('features.sales_t.tag'),
                        'permissions' => [
                            config('permissions.read'),
                            config('permissions.view'),
                            config('permissions.create'),
                            config('permissions.print'),
                        ],

                    ],
                ],
            ],

            [
                'user' => $salesOfficer5,
                'role_code' => config('roles.sales_officer.code'),
                'features_permissions' => [
                    [
                        'feature_tag' => config('features.sales_t.tag'),
                        'permissions' => [
                            config('permissions.read'),
                            config('permissions.view'),
                            config('permissions.create'),
                            config('permissions.print'),
                        ],

                    ],
                ],
            ],

            [
                'user' => $cashier1,
                'role_code' => config('roles.cashier.code'),
                'features_permissions' => [
                    [
                        'feature_tag' => config('features.cash.tag'),
                        'permissions' => [
                            config('permissions.read'),
                            config('permissions.view'),
                            config('permissions.create'),
                            config('permissions.update'),
                            config('permissions.delete'),
                            config('permissions.print'),
                        ],

                    ],
                ],
            ],

            [
                'user' => $coordinator1,
                'role_code' => config('roles.coordinator.code'),
                'features_permissions' => [
                    [
                        'feature_tag' => config('features.user_m.tag'),
                        'permissions' => [
                            config('permissions.read'),
                            config('permissions.view'),
                            config('permissions.create'),
                            config('permissions.update'),
                            config('permissions.delete'),
                            config('permissions.print'),
                            config('permissions.upload'),
                        ],

                    ],
                    [
                        'feature_tag' => config('features.customer_m.tag'),
                        'permissions' => [
                            config('permissions.read'),
                            config('permissions.view'),
                            config('permissions.create'),
                            config('permissions.update'),
                            config('permissions.delete'),
                            config('permissions.print'),
                            config('permissions.upload'),
                        ],
                    ],
                ],
            ],

            [
                'user' => $mcoHead1,
                'role_code' => config('roles.mco_head.code'),
                'features_permissions' => [
                    [
                        'feature_tag' => config('features.transaction.tag'),
                        'permissions' => [
                            config('permissions.read'),
                            config('permissions.view'),
                            config('permissions.create'),
                            config('permissions.update'),
                            config('permissions.delete'),
                            config('permissions.print'),
                            config('permissions.upload'),
                        ],
                    ],
                ],
            ],

            [
                'user' => $evp1,
                'role_code' => config('roles.evp.code'),
                'features_permissions' => [
                    [
                        'feature_tag' => config('features.company.tag'),
                        'permissions' => [
                            config('permissions.read'),
                            config('permissions.view'),
                            config('permissions.create'),
                            config('permissions.update'),
                            config('permissions.delete'),
                            config('permissions.print'),
                            config('permissions.upload'),
                        ],
                    ],
                ],
            ],

            [
                'user' => $merchandiser1,
                'role_code' => config('roles.merchandiser.code'),
                'features_permissions' => [
                    [
                        'feature_tag' => config('features.pricing.tag'),
                        'permissions' => [
                            config('permissions.read'),
                            config('permissions.view'),
                            config('permissions.create'),
                            config('permissions.update'),
                            config('permissions.delete'),
                            config('permissions.print'),
                            config('permissions.upload'),
                        ],
                    ],
                ],
            ],

            [
                'user' => $warehouseOfficer1,
                'role_code' => config('roles.warehouse_officer.code'),
                'features_permissions' => [
                    [
                        'feature_tag' => config('features.warehouse_m.tag'),
                        'permissions' => [
                            config('permissions.read'),
                            config('permissions.view'),
                            config('permissions.create'),
                            config('permissions.update'),
                            config('permissions.delete'),
                            config('permissions.print'),
                            config('permissions.upload'),
                        ],
                    ],
                ],
            ],

            [
                'user' => $warehouseOfficer2,
                'role_code' => config('roles.warehouse_officer.code'),
                'features_permissions' => [
                    [
                        'feature_tag' => config('features.warehouse_m.tag'),
                        'permissions' => [
                            config('permissions.read'),
                            config('permissions.view'),
                            config('permissions.create'),
                            config('permissions.update'),
                            config('permissions.delete'),
                            config('permissions.print'),
                            config('permissions.upload'),
                        ],
                    ],

                ],
            ],

        ];



        foreach ($userRolesFeaturePermissions as $userRolesFeaturePermission) {
            $user = $userRolesFeaturePermission['user'];
            $roleCode = $userRolesFeaturePermission['role_code'];

            $roleId = $roles[$roleCode] ?? null;
            if ($roleId) {
                $user->roles()->syncWithoutDetaching([$roleId]);
            }

            $roleFeaturePermissions = [];
            foreach ($userRolesFeaturePermission['features_permissions'] as $featPerm) {
                foreach ($featPerm['permissions'] as $permissionName) {
                    $featureID = $features[$featPerm['feature_tag']];
                    $permissionID = $permissions[$permissionName];

                    array_push($roleFeaturePermissions, [
                        'role_id' => $roleId,
                        'feature_id' => $featureID,
                        'permission_id' => $permissionID,
                    ]);
                }
            }

            DB::table('role_feature_permissions')->insert($roleFeaturePermissions);
        }

    }
}
