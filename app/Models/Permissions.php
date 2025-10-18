<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permissions extends Model
{
    protected $guarded = ['id'];

    public $timestamps = false;

    public function features()
    {
        return $this->belongsToMany(Features::class, 'role_feature_permissions','permission_id', 'feature_id')
            ->withPivot('role_id');

    }
}
