<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Roles extends Model
{
    protected $guarded = ['id'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_roles', 'role_id', 'user_id');
    }

    public function features()
    {
        return $this->belongsToMany(Features::class, 'role_feature_permissions', 'role_id', 'feature_id')
            ->withPivot('permission_id');
    }

    public function permissions()
    {
        return $this->belongsToMany(Permissions::class, 'role_feature_permissions', 'role_id', 'permission_id')
            ->withPivot('feature_id');
    }
}
