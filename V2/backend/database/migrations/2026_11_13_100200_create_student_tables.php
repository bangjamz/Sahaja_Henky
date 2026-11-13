<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Siswa dengan nama samaran. Nama asli tidak pernah disimpan di sini, hanya di skema rahasia.
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('class_id')->constrained('classes')->restrictOnDelete();
            $table->string('resp_code', 20)->unique();
            $table->string('pseudonym', 40)->nullable();
            $table->string('avatar', 40)->nullable();
            $table->string('status', 20)->default('invited');
            $table->timestamp('parent_consent_at')->nullable();
            $table->timestamp('assent_at')->nullable();
            $table->timestamp('activated_at')->nullable();
            $table->timestamps();
        });

        Schema::create('activation_codes', function (Blueprint $table) {
            // Hanya hash kode yang disimpan (dokumen 04 bagian 5).
            $table->string('code_hash', 128)->primary();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->timestamp('expires_at');
            $table->timestamp('used_at')->nullable();
        });

        Schema::create('student_devices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->string('device_hash', 128);
            $table->string('display_class', 10);
            $table->timestamp('first_seen');
            $table->timestamp('last_seen');
            $table->unique(['student_id', 'device_hash']);
        });

        Schema::create('audit_log', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('action', 60);
            $table->string('target', 120);
            $table->timestamp('created_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('audit_log');
        Schema::dropIfExists('student_devices');
        Schema::dropIfExists('activation_codes');
        Schema::dropIfExists('students');
    }
};
