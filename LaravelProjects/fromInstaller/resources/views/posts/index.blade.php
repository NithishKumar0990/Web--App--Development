@extends('layouts.app')

@section('content')
<h1>All Blog Posts</h1>

<a href="{{ route('posts.create') }}">+ Create New Post</a>

<ul>
@foreach($posts as $post)
    <li>
        <strong>{{ $post->title }}</strong>
        - {{ $post->is_published ? 'Published' : 'Draft' }}

        <a href="{{ route('posts.edit', $post) }}">Edit</a>

        <form action="{{ route('posts.destroy', $post) }}" method="POST" style="display:inline;">
            @csrf
            @method('DELETE')
            <button type="submit">Delete</button>
        </form>
    </li>
@endforeach
</ul>
@endsection