<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Identitas asli siswa di skema rahasia, lewat koneksi pgsql_rahasia.
 * Hanya dipanggil dari kode yang memeriksa peran researcher_pii (dokumen 04 bagian 4).
 */
class StudentIdentity extends Model
{
    protected $connection = 'pgsql_rahasia';

    // Ditulis lengkap dengan skema supaya benar walaupun search_path koneksi berbeda.
    protected $table = 'rahasia.student_identities';

    protected $primaryKey = 'student_id';

    public $incrementing = false;

    protected $fillable = ['student_id', 'real_name_enc', 'gender', 'birth_year'];

    protected $hidden = ['real_name_enc'];

    protected function casts(): array
    {
        return ['real_name_enc' => 'encrypted'];
    }

    /** @return BelongsTo<Student, $this> */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
