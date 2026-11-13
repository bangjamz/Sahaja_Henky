<?php

namespace App\Domain\Akses;

use App\Enums\Role;
use App\Enums\ScopeType;
use App\Models\Cohort;
use App\Models\Organization;
use App\Models\Program;
use App\Models\RoleAssignment;
use App\Models\School;
use App\Models\SchoolClass;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use InvalidArgumentException;

/**
 * Satu-satunya tempat pemeriksaan peran bercakupan (dokumen 04, "Aturan akses").
 *
 * Peran di cakupan yang lebih luas berlaku untuk cakupan di bawahnya:
 * platform > organisasi > program dan sekolah > kohort > kelas.
 * Peran yang sudah dicabut (revoked_at terisi) tidak berlaku.
 */
final class Akses
{
    /**
     * @param  Role|list<Role>  $peran
     */
    public static function punya(User $user, Role|array $peran, ?Model $cakupan = null): bool
    {
        $daftarPeran = array_map(
            fn (Role $r): string => $r->value,
            is_array($peran) ? $peran : [$peran],
        );

        $rantai = self::rantaiCakupan($cakupan);

        return RoleAssignment::query()
            ->active()
            ->where('user_id', $user->id)
            ->whereIn('role', $daftarPeran)
            ->where(function (Builder $q) use ($rantai): void {
                foreach ($rantai as [$jenis, $id]) {
                    $q->orWhere(function (Builder $q) use ($jenis, $id): void {
                        $q->where('scope_type', $jenis->value);
                        $id === null ? $q->whereNull('scope_id') : $q->where('scope_id', $id);
                    });
                }
            })
            ->exists();
    }

    /**
     * Daftar cakupan dari yang paling sempit sampai platform.
     *
     * @return list<array{0: ScopeType, 1: int|null}>
     */
    public static function rantaiCakupan(?Model $cakupan): array
    {
        $rantai = match (true) {
            $cakupan === null => [],
            $cakupan instanceof Organization => [[ScopeType::Organization, $cakupan->id]],
            $cakupan instanceof Program => [
                [ScopeType::Program, $cakupan->id],
                [ScopeType::Organization, $cakupan->organization_id],
            ],
            $cakupan instanceof School => [
                [ScopeType::School, $cakupan->id],
                [ScopeType::Organization, $cakupan->organization_id],
            ],
            $cakupan instanceof Cohort => [
                [ScopeType::Cohort, $cakupan->id],
                ...self::rantaiCakupan($cakupan->program),
                ...self::rantaiCakupan($cakupan->school),
            ],
            $cakupan instanceof SchoolClass => [
                [ScopeType::SchoolClass, $cakupan->id],
                ...self::rantaiCakupan($cakupan->cohort),
            ],
            default => throw new InvalidArgumentException('Cakupan tidak dikenal: '.$cakupan::class),
        };

        // Rantai anak bisa memuat cakupan yang sama dua kali (misalnya platform); duplikat dibuang.
        $rantai[] = [ScopeType::Platform, null];

        return self::unik($rantai);
    }

    /**
     * @param  list<array{0: ScopeType, 1: int|null}>  $rantai
     * @return list<array{0: ScopeType, 1: int|null}>
     */
    private static function unik(array $rantai): array
    {
        $hasil = [];
        foreach ($rantai as $c) {
            $hasil[$c[0]->value.':'.($c[1] ?? '-')] = $c;
        }

        return array_values($hasil);
    }
}
