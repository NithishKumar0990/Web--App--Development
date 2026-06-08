@echo off
echo ========================================================
echo   Laravel SQLite Database Auto-Setup for Windows
echo ========================================================
echo.

:: Move to the Laravel project directory
cd /d "%~dp0"

:: 1. Copy .env.example to .env if it doesn't exist
if not exist .env (
    echo [1/5] Creating .env file from .env.example...
    copy .env.example .env >nul
) else (
    echo [1/5] .env file already exists.
)

:: 2. Create database.sqlite if it doesn't exist
if not exist database\database.sqlite (
    echo [2/5] Creating database/database.sqlite...
    type nul > database\database.sqlite
) else (
    echo [2/5] database/database.sqlite already exists.
)

:: 3. Configure .env file to use sqlite
echo [3/5] Updating database settings in .env to SQLite...
powershell -Command "(Get-Content .env) -replace '^DB_CONNECTION=.*', 'DB_CONNECTION=sqlite' | Set-Content .env"
powershell -Command "(Get-Content .env) -replace '^DB_HOST=.*', '# DB_HOST=' | Set-Content .env"
powershell -Command "(Get-Content .env) -replace '^DB_PORT=.*', '# DB_PORT=' | Set-Content .env"
powershell -Command "(Get-Content .env) -replace '^DB_DATABASE=.*', '# DB_DATABASE=' | Set-Content .env"
powershell -Command "(Get-Content .env) -replace '^DB_USERNAME=.*', '# DB_USERNAME=' | Set-Content .env"
powershell -Command "(Get-Content .env) -replace '^DB_PASSWORD=.*', '# DB_PASSWORD=' | Set-Content .env"

:: 4. Generate Application Key
echo [4/5] Generating application key...
php artisan key:generate

:: 5. Run migrations
echo [5/5] Running database migrations...
php artisan migrate --force

echo.
echo ========================================================
echo   SUCCESS: SQLite database setup and migration complete!
echo   You can now start the dev servers using 'npm run dev'.
echo ========================================================
pause
