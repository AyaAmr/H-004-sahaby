<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Volunteer extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'phone_number', 'password', 'name', 'gender', 'fb_id', 'language_id', 'country_id', 'image_name'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     */
    public function typeNeeds()
    {
        return $this->belongsToMany(TypeNeed::class);
    }

    public function requests()
    {
        return $this->belongsToMany(Request::class);
    }
}
