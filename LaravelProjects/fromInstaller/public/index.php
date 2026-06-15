<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
echo "DEPLOYS_ARE_WORKING_OK"; exit;

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/../vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

try {
    $response = $app->handleRequest(Request::capture());
    $response->send();
    $app->terminate();
} catch (\Throwable $e) {
    echo "ORIGINAL FATAL ERROR: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString();
    exit(1);
}


