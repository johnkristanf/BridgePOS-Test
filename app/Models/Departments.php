<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Departments extends Model
{
    protected $guarded = ['id'];

    public function roles()
    {
        return $this->hasMany(Roles::class);
    }
}
