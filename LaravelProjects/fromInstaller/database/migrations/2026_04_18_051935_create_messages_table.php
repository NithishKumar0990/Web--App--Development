<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable(); // Phone is optional in your form
            $table->text('message');
            $table->boolean('is_read')->default(false); // For future admin dashboard (unread/read)
            $table->timestamp('read_at')->nullable(); // When you read it
            $table->timestamps(); // created_at, updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};