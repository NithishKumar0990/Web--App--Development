<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PostController;

// Homepage
Route::get('/', function () {
    return view('welcome');
});

// About page
Route::get('/about', [PageController::class, 'about']);

// Public Blog (visitors see this)
Route::get('/blog', [PostController::class, 'blogIndex'])->name('blog.index');
Route::get('/blog/{slug}', [PostController::class, 'blogShow'])->name('blog.show');

// Admin: Manage Projects
Route::resource('projects', ProjectController::class);

// Admin: Manage Blog Posts
Route::resource('posts', PostController::class);

use App\Models\Message;

Route::get('/debug/messages', function() {
    return Message::latest()->get(); // Shows all messages as JSON
});