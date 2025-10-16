<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Features extends Model
{
    protected $guarded = ['id'];

    public function permissions()
    {
        return $this->belongsToMany(Permissions::class, 'role_feature_permissions')
            ->withPivot('role_id');
    }
}
