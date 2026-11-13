<?php

namespace App\Models;

use App\Enums\Role;
use App\Enums\ScopeType;
use Database\Factories\RoleAssignmentFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RoleAssignment extends Model
{
    /** @use HasFactory<RoleAssignmentFactory> */
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['user_id', 'role', 'scope_type', 'scope_id', 'granted_by', 'granted_at', 'revoked_at'];

    protected function casts(): array
    {
        return [
            'role' => Role::class,
            'scope_type' => ScopeType::class,
            'granted_at' => 'datetime',
            'revoked_at' => 'datetime',
        ];
    }

    /** @return BelongsTo<User, $this> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @param  Builder<RoleAssignment>  $query
     * @return Builder<RoleAssignment>
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->whereNull('revoked_at');
    }
}
