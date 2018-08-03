<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TypeNeed extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

    public function volunteers()
    {
        return $this->belongsToMany(Volunteer::class);
    }
}
