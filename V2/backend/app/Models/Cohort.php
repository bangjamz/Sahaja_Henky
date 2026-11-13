<?php

namespace App\Models;

use App\Enums\CohortArm;
use Database\Factories\CohortFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $program_id
 * @property int $school_id
 * @property CohortArm $arm
 * @property Carbon $start_date
 * @property int $posttest_week
 * @property string $status
 */
class Cohort extends Model
{
    /** @use HasFactory<CohortFactory> */
    use HasFactory;

    protected $fillable = ['program_id', 'school_id', 'arm', 'start_date', 'posttest_week', 'status'];

    protected function casts(): array
    {
        return ['arm' => CohortArm::class, 'start_date' => 'date'];
    }

    /** @return BelongsTo<Program, $this> */
    public function program(): BelongsTo
    {
        return $this->belongsTo(Program::class);
    }

    /** @return BelongsTo<School, $this> */
    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    /** @return HasMany<SchoolClass, $this> */
    public function classes(): HasMany
    {
        return $this->hasMany(SchoolClass::class);
    }
}
