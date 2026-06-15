<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

$app = Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php', 
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->create();

class CustomExceptionHandler extends \Illuminate\Foundation\Exceptions\Handler {
    public function render($request, \Throwable $e): \Symfony\Component\HttpFoundation\Response {
        header('Content-Type: text/plain');
        echo "ACTUAL BOOTSTRAP EXCEPTION: " . $e->getMessage() . "\n";
        echo "File: " . $e->getFile() . " Line: " . $e->getLine() . "\n";
        echo $e->getTraceAsString();
        exit(1);
    }
}

$app->singleton(
    \Illuminate\Contracts\Debug\ExceptionHandler::class,
    CustomExceptionHandler::class
);

return $app;
