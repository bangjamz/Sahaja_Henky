<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

// Platform dan program (dokumen 04 bagian 4).
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('organizations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type', 40);
            $table->timestamps();
        });

        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->restrictOnDelete();
            $table->string('code', 40)->unique();
            $table->string('title');
            $table->string('level', 20);
            $table->jsonb('modules_json')->default('{}');
            $table->string('status', 20)->default('draft');
            $table->timestamps();
        });

        Schema::create('schools', function (Blueprint $table) {
            $table->id();
            $table->foreignId('organization_id')->constrained()->restrictOnDelete();
            $table->string('code', 40)->unique();
            $table->string('name');
            $table->string('district', 80);
            $table->string('type', 20);
            $table->jsonb('contacts_json')->default('{}');
            $table->timestamps();
        });

        Schema::create('cohorts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_id')->constrained()->restrictOnDelete();
            $table->foreignId('school_id')->constrained()->restrictOnDelete();
            $table->string('arm', 20);
            $table->date('start_date');
            $table->unsignedSmallInteger('posttest_week');
            $table->string('status', 20)->default('draft');
            $table->timestamps();
        });
        DB::statement("alter table cohorts add constraint cohorts_arm_check check (arm in ('experiment','control','pilot','survey','demo'))");

        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')->constrained()->restrictOnDelete();
            $table->foreignId('cohort_id')->constrained()->restrictOnDelete();
            $table->string('name', 40);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('classes');
        Schema::dropIfExists('cohorts');
        Schema::dropIfExists('schools');
        Schema::dropIfExists('programs');
        Schema::dropIfExists('organizations');
    }
};
