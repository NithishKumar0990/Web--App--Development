<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio Manager</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        nav { margin-bottom: 20px; padding: 10px; background: #eee; }
        nav a { margin-right: 15px; text-decoration: none; color: #333; font-weight: bold; }
    </style>
</head>
<body>

    <!-- This is your master Navbar. It will show on ALL pages! -->
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="{{ route('projects.index') }}">Manage Projects</a>
    </nav>

    <!-- 
       This is the magic part! 
       Laravel will inject index.blade.php, create.blade.php, etc. right HERE 
    -->
    <div style="padding: 20px; border: 1px solid #ccc;">
        @yield('content')
    </div>

</body>
</html>