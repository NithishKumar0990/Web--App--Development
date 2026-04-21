@extends('layouts.app')

@section('content')
    <h1>Edit Project</h1>

    @if($errors->any())
        <ul style="color: red;">
            @foreach($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    @endif

    <form action="{{ route('projects.update', $project) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')

        <div>
            <label>Title *</label>
            <input type="text" name="title" value="{{ old('title', $project->title) }}">
        </div>

        <div>
            <label>Description</label>
            <textarea name="description">{{ old('description', $project->description) }}</textarea>
        </div>

        <div>
            <label>Link</label>
            <input type="url" name="link" value="{{ old('link', $project->link) }}">
        </div>

        <div>
            <label>Image</label>
            @if($project->image)
                <img src="{{ asset('storage/' . $project->image) }}" width="150"><br>
            @endif
            <input type="file" name="image">
        </div>

        <button type="submit">Update</button>
        <a href="{{ route('projects.index') }}">Cancel</a>
    </form>
@endsection