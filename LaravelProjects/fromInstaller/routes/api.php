<?php

use Illuminate\Support\Facades\Route;
use App\Models\Post;
use App\Http\Controllers\ContactController;

Route::post('/contact', [ContactController::class, 'send']);

// Get all published blog posts
Route::get('/posts', function () {
    return Post::where('is_published', true)
               ->latest()
               ->get(['id', 'title', 'slug', 'excerpt', 'created_at']);
});

// Get single post by slug
Route::get('/posts/{slug}', function ($slug) {
    return Post::where('slug', $slug)
               ->where('is_published', true)
               ->firstOrFail();
});

Route::get('/contact', function () {
    return response()->json(['message' => 'Contact endpoint is alive']);
});
