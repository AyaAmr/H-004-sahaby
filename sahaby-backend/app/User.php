<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'phone_number', 'password', 'fb_id', 'gender', 'language_id', 'preferred_gender', 'type_need_id', 'language_id', 'country_id', 'image_name'
    ];

    protected $appends = [
        'image'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function getImageAttribute()
    {
        return config('app.url') . '/images/' . $this->image_name;
    }

    public function requests()
    {
        return $this->belongsToMany(Request::class);
    }
}
