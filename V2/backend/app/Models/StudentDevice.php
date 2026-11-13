<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentDevice extends Model
{
    public $timestamps = false;

    protected $fillable = ['student_id', 'device_hash', 'display_class', 'first_seen', 'last_seen'];

    protected function casts(): array
    {
        return ['first_seen' => 'datetime', 'last_seen' => 'datetime'];
    }

    /** @return BelongsTo<Student, $this> */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }
}
