<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Roles extends Model
{
    protected $guarded = ['id'];

    public function users()
    {
        return $this->belongsToMany(Roles::class, 'user_roles', 'role_id', 'user_id');
    }

    public function features()
    {
        return $this->belongsToMany(Features::class, 'role_feature_permissions')
            ->withPivot('permission_id')
            ->with('permissions');
    }

    public function permissions()
    {
        return $this->belongsToMany(Permissions::class, 'role_feature_permissions')
            ->withPivot('feature_id');
    }
}
