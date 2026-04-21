<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    // ✅ These fields are allowed to be saved via create()/update()
    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'body',
        'image',
        'is_published'
    ];
}