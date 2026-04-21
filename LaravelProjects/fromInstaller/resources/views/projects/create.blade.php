@extends('layouts.app')

@section('content')
    <h1>Add Project</h1>

    @if($errors->any())
        <ul style="color: red;">
            @foreach($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    @endif

    <form action="{{ route('projects.store') }}" method="POST" enctype="multipart/form-data">
        @csrf

        <div>
            <label>Title *</label>
            <input type="text" name="title" value="{{ old('title') }}">
        </div>

        <div>
            <label>Description</label>
            <textarea name="description">{{ old('description') }}</textarea>
        </div>

        <div>
            <label>Link</label>
            <input type="url" name="link" value="{{ old('link') }}">
        </div>

        <div>
            <label>Image</label>
            <input type="file" name="image">
        </div>

        <button type="submit">Save</button>
        <a href="{{ route('projects.index') }}">Cancel</a>
    </form>
@endsection