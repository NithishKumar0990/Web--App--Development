@extends('layouts.app')

@section('content')
<h1>Create Blog Post</h1>

<form action="{{ route('posts.store') }}" method="POST">
    @csrf

    <input type="text" name="title" placeholder="Title"><br><br>
    <textarea name="excerpt" placeholder="Short Description"></textarea><br><br>
    <textarea name="body" placeholder="Full Content"></textarea><br><br>

    <label>
        <input type="checkbox" name="is_published" value="1">
        Publish
    </label><br><br>

    <button type="submit">Save</button>
</form>
@endsection