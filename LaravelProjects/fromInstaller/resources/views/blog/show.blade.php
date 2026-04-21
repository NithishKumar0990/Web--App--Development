@extends('layouts.app')
@section('content')
<article>
    <h1>{{ $post->title }}</h1>
    <small>Published on {{ $post->created_at->format('F d, Y') }}</small>
    
    <div style="margin-top: 20px; line-height: 1.7;">
        {!! nl2br(e($post->body)) !!}
    </div>
</article>

<br>
<a href="{{ route('blog.index') }}">← Back to all posts</a>
@endsection