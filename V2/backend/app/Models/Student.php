<?php

namespace App\Models;

use Database\Factories\StudentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Carbon;
use Laravel\Sanctum\HasApiTokens;

/**
 * @property int $id
 * @property int $class_id
 * @property string $resp_code
 * @property string|null $pseudonym
 * @property string|null $avatar
 * @property string $status
 * @property Carbon|null $parent_consent_at
 * @property Carbon|null $assent_at
 * @property Carbon|null $activated_at
 *
 * Siswa. Pemilik token Sanctum siswa. Tidak punya sandi; masuk lewat kode aktivasi (M1-01).
 * Nama asli hanya ada di rahasia.student_identities.
 */
class Student extends Authenticatable
{
    /** @use HasFactory<StudentFactory> */
    use HasApiTokens, HasFactory;

    protected $fillable = ['class_id', 'resp_code', 'pseudonym', 'avatar', 'status'];

    protected $hidden = ['remember_token'];

    protected function casts(): array
    {
        return [
            'parent_consent_at' => 'datetime',
            'assent_at' => 'datetime',
            'activated_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<SchoolClass, $this> */
    public function schoolClass(): BelongsTo
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    /** @return HasMany<StudentDevice, $this> */
    public function devices(): HasMany
    {
        return $this->hasMany(StudentDevice::class);
    }

    /**
     * Hanya untuk kode yang sudah memeriksa peran researcher_pii.
     *
     * @return HasOne<StudentIdentity, $this>
     */
    public function identity(): HasOne
    {
        return $this->hasOne(StudentIdentity::class);
    }
}
