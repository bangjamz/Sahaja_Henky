<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

// Peran bercakupan (keputusan T6). Pemeriksaan hanya lewat App\Domain\Akses\Akses.
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('role_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('role', 30);
            $table->string('scope_type', 20);
            // Kosong hanya untuk cakupan platform.
            $table->unsignedBigInteger('scope_id')->nullable();
            $table->foreignId('granted_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('granted_at')->useCurrent();
            $table->timestamp('revoked_at')->nullable();
            $table->index(['user_id', 'role', 'scope_type', 'scope_id']);
        });

        DB::statement("alter table role_assignments add constraint role_assignments_scope_check check (
            (scope_type = 'platform' and scope_id is null) or
            (scope_type in ('organization','program','school','cohort','class') and scope_id is not null)
        )");
        DB::statement("alter table role_assignments add constraint role_assignments_role_check check (role in (
            'super_admin','program_admin','researcher','researcher_pii','school_admin',
            'facilitator','counselor','validator','content_author','content_reviewer'
        ))");
    }

    public function down(): void
    {
        Schema::dropIfExists('role_assignments');
    }
};
