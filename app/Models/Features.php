<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Features extends Model
{
    protected $guarded = ['id'];

    public $timestamps = false;

    public function permissions()
    {
        return $this->belongsToMany(Permissions::class, 'role_feature_permissions', 'feature_id', 'permission_id')
            ->withPivot('role_id');
    }
}
