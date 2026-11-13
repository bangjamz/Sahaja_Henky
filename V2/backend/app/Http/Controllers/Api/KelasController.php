<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\KelasResource;
use App\Models\SchoolClass;
use Illuminate\Support\Facades\Gate;

class KelasController extends Controller
{
    /** Ringkasan satu kelas untuk staf yang punya peran di cakupan kelas itu. */
    public function show(SchoolClass $kelas): KelasResource
    {
        Gate::authorize('view', $kelas);

        return new KelasResource($kelas->load(['school', 'cohort']));
    }
}
