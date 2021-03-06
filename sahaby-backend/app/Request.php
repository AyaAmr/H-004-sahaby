<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Request extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'volunteer_id', 'step_id', 'preferred_gender', 'text_notes', 'voice_notes', 'request_status'];

    protected $appends = [
        'request_since'
    ];

    public function getRequestSinceAttribute()
    {
        $now = Carbon::now();
        return $now->diffInMinutes($this->created_at);
    }

    public function volunteer()
    {
        return $this->belongsTo(Volunteer::class);
    }

    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function volunteers()
    {
        return $this->belongsToMany(Volunteer::class);
    }
}
