<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SiswaSayaResource;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class SiswaSayaController extends Controller
{
    /** Data siswa yang sedang masuk. */
    public function __invoke(Request $request): SiswaSayaResource
    {
        /** @var Student $siswa */
        $siswa = $request->user();
        Gate::forUser($siswa)->authorize('viewSelf', $siswa);

        return new SiswaSayaResource($siswa->load('schoolClass.cohort'));
    }
}
