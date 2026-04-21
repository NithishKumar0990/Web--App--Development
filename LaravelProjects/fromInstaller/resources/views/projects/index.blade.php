@extends('layouts.app')

@section('content')
    <h1>My Projects</h1>

    @if(session('success'))
        <p style="color: green;">{{ session('success') }}</p>
    @endif

    <a href="{{ route('projects.create') }}">+ Add New Project</a>

    <ul>
        @foreach($projects as $project)
            <li>
                <h2>{{ $project->title }}</h2>
                <p>{{ $project->description }}</p>
                @if($project->link)
                    <a href="{{ $project->link }}" target="_blank">View</a>
                @endif
                @if($project->image)
                    <img src="{{ asset('storage/' . $project->image) }}" width="150">
                @endif

                <a href="{{ route('projects.edit', $project) }}">Edit</a>

                <form action="{{ route('projects.destroy', $project) }}" method="POST" style="display:inline;">
                    @csrf
                    @method('DELETE')
                    <button type="submit" onclick="return confirm('Delete this project?')">Delete</button>
                </form>
            </li>
        @endforeach
    </ul>
@endsection