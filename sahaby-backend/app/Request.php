<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Request extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'volunteer_id', 'step_id', 'preferred_gender', 'text_notes', 'voice_notes', 'request_status'];

    public function volunteer()
    {
        return $this->belongsTo(Volunteer::class);
    }

}
