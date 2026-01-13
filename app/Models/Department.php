<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Department extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'company_id',
        'code',
        'name',
        'is_kustodian',
        'is_active',
    ];

    protected $casts = [
        'is_kustodian' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }

    // For kustodian: which subcontractors are under this department
    public function subcontractors(): BelongsToMany
    {
        return $this->belongsToMany(Company::class, 'subcontractor_kustodian', 'kustodian_id', 'subcontractor_id')
            ->withTimestamps();
    }
}
