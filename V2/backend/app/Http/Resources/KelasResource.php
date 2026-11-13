<?php

namespace App\Http\Resources;

use App\Models\SchoolClass;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Ringkasan kelas untuk staf.
 *
 * @mixin SchoolClass
 */
class KelasResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'school' => [
                'id' => $this->school->id,
                'name' => $this->school->name,
            ],
            'cohort' => [
                'id' => $this->cohort->id,
                'arm' => $this->cohort->arm->value,
                'start_date' => $this->cohort->start_date->toDateString(),
                'posttest_week' => $this->cohort->posttest_week,
            ],
            'student_count' => $this->students()->count(),
        ];
    }
}
