<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

// Skema terpisah untuk identitas siswa dan laporan insiden (dokumen 04 bagian 4).
// Di server, hak baca skema ini hanya diberikan kepada pengguna RAHASIA_DB_USERNAME (file 13).
return new class extends Migration
{
    public function up(): void
    {
        DB::statement('create schema if not exists rahasia');

        Schema::create('rahasia.student_identities', function (Blueprint $table) {
            $table->foreignId('student_id')->primary()->constrained('public.students')->cascadeOnDelete();
            // Terenkripsi dengan cast `encrypted` (kunci APP_KEY).
            $table->text('real_name_enc');
            $table->string('gender', 10)->nullable();
            $table->unsignedSmallInteger('birth_year')->nullable();
            $table->timestamps();
        });

        Schema::create('rahasia.incident_reports', function (Blueprint $table) {
            $table->id();
            // Tabel escalations dibuat di M3-06; kolom ini diberi foreign key saat itu.
            $table->unsignedBigInteger('escalation_id');
            $table->text('payload_enc');
            $table->foreignId('by_user')->constrained('public.users')->restrictOnDelete();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('rahasia.incident_reports');
        Schema::dropIfExists('rahasia.student_identities');
        DB::statement('drop schema if exists rahasia');
    }
};
