<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LabTestType extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'code',
        'name',
        'category',
        'unit',
        'normal_range_min',
        'normal_range_max',
        'is_active',
    ];

    protected $casts = [
        'normal_range_min' => 'decimal:2',
        'normal_range_max' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function labTests(): HasMany
    {
        return $this->hasMany(LabTest::class);
    }
}
