<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Company extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'code',
        'name',
        'type',
        'address',
        'phone',
        'email',
        'pic_name',
        'pic_phone',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function departments(): HasMany
    {
        return $this->hasMany(Department::class);
    }

    public function positions(): HasMany
    {
        return $this->hasMany(Position::class);
    }

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }

    // For subcontractors: which kustodians they belong to
    public function kustodians(): BelongsToMany
    {
        return $this->belongsToMany(Department::class, 'subcontractor_kustodian', 'subcontractor_id', 'kustodian_id')
            ->withTimestamps();
    }

    public function isMainContractor(): bool
    {
        return $this->type === 'main_contractor';
    }

    public function isSubContractor(): bool
    {
        return $this->type === 'sub_contractor';
    }
}
