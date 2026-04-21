<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::latest()->get();
        return view('posts.index', compact('posts'));
    }

    public function create()
    {
        return view('posts.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'body' => 'required',
        ]);

        Post::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'excerpt' => $request->excerpt,
            'body' => $request->body,
            'is_published' => $request->is_published ? true : false,
        ]);

        return redirect()->route('posts.index');
    }

    public function edit(Post $post)
    {
        return view('posts.edit', compact('post'));
    }

    public function update(Request $request, Post $post)
    {
        $post->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'excerpt' => $request->excerpt,
            'body' => $request->body,
            'is_published' => $request->is_published ? true : false,
        ]);

        return redirect()->route('posts.index');
    }

    public function destroy(Post $post)
    {
        $post->delete();
        return redirect()->route('posts.index');
    }

    public function blogIndex()
    {
        $posts = Post::where('is_published', true)->latest()->get();
        return view('blog.index', compact('posts'));
    }

    public function blogShow($slug)
    {
        // Find post by its slug
        $post = Post::where('slug', $slug)->where('is_published', true)->firstOrFail();
        return view('blog.show', compact('post'));
    }

        // --- API METHODS FOR REACT ---

    public function apiIndex()
    {
        $posts = Post::where('is_published', true)->latest()->get();
        
        // Return data as JSON (React loves this!)
        return response()->json([
            'success' => true,
            'data' => $posts
        ], 200);
    }

    public function apiShow($slug)
    {
        $post = Post::where('slug', $slug)->where('is_published', true)->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $post
        ], 200);
    }
    public function show(Post $post)
{
    return view('posts.show', compact('post'));
}
}