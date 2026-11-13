<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/** Menolak token siswa di endpoint staf. Policy tetap memeriksa peran dan cakupan. */
class HanyaStaf
{
    public function handle(Request $request, Closure $next): Response
    {
        abort_unless($request->user() instanceof User, 403);

        return $next($request);
    }
}
