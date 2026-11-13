<?php

namespace App\Http\Resources;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Data siswa untuk dirinya sendiri. Tidak memuat nama asli atau kode responden.
 *
 * @mixin Student
 */
class SiswaSayaResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'pseudonym' => $this->pseudonym,
            'avatar' => $this->avatar,
            'status' => $this->status,
            'class_name' => $this->schoolClass->name,
            // Klien perlu lengan kohort untuk menampilkan mode kontrol (layar A-35).
            'arm' => $this->schoolClass->cohort->arm->value,
            'assent_at' => $this->assent_at?->toIso8601String(),
        ];
    }
}
