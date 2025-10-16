<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permissions extends Model
{
    protected $guarded = ['id'];

    public function features()
    {
        return $this->belongsToMany(Features::class, 'role_feature_permissions')
            ->withPivot('role_id');

    }
}
