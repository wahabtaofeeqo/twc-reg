<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->nullable();
            $table->string('code')->nullable();
            $table->boolean('is_sent')->default(false);
            $table->string('industry')->nullable();
            $table->string('attendance')->nullable();
            $table->string('designation')->nullable();
            $table->string('nationality')->nullable();
            $table->string('organization')->nullable();
            $table->string('questions')->nullable();
            $table->string('masterclass')->nullable();
            $table->string('picture_consent', 100)->nullable();
            $table->boolean('wants_mentorship')->nullable()->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
