@extends('layouts.app')

@section('content')
<h1>Edit Blog Post</h1>

<form action="{{ route('posts.update', $post) }}" method="POST">
    @csrf
    @method('PUT')

    <input type="text" name="title" value="{{ $post->title }}"><br><br>
    <textarea name="excerpt">{{ $post->excerpt }}</textarea><br><br>
    <textarea name="body">{{ $post->body }}</textarea><br><br>

    <label>
        <input type="checkbox" name="is_published" value="1" {{ $post->is_published ? 'checked' : '' }}>
        Publish
    </label><br><br>

    <button type="submit">Update</button>
</form>
@endsection