<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCDK extends Model
{
    /** @use HasFactory<\Database\Factories\UserCDKFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'value', 'stage'];

    function user()
    {
        return $this->belongsTo(User::class);
    }
}
