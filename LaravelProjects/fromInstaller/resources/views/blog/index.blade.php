@extends('layouts.app')
@section('content')
<h1>My Blog</h1>

@forelse($posts as $post)
    <article style="margin-bottom: 30px;">
        <h2>
            <a href="{{ route('blog.show', $post->slug) }}">{{ $post->title }}</a>
        </h2>
        <p>{{ $post->excerpt }}</p>
        <small>Posted on {{ $post->created_at->format('M d, Y') }}</small>
    </article>
    <hr>
@empty
    <p>No posts published yet.</p>
@endforelse
@endsection