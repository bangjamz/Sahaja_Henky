<?php

namespace App\Http\Middleware;

use App\Models\Student;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

/** Menolak token staf di endpoint siswa. */
class HanyaSiswa
{
    public function handle(Request $request, Closure $next): Response
    {
        // Guard Sanctum bisa mengembalikan staf (User) atau siswa (Student), tergantung pemilik token.
        abort_unless(Auth::guard('sanctum')->user() instanceof Student, 403);

        return $next($request);
    }
}
