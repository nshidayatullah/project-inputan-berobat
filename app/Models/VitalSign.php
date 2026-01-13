<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VitalSign extends Model
{
    use HasFactory;

    protected $fillable = [
        'visit_id',
        'blood_pressure_systolic',
        'blood_pressure_diastolic',
        'pulse',
        'respiratory_rate',
        'temperature',
        'spo2',
        'weight',
        'height',
        'bmi',
        'measured_at',
    ];

    protected $casts = [
        'blood_pressure_systolic' => 'integer',
        'blood_pressure_diastolic' => 'integer',
        'pulse' => 'integer',
        'respiratory_rate' => 'integer',
        'temperature' => 'decimal:1',
        'spo2' => 'integer',
        'weight' => 'decimal:2',
        'height' => 'decimal:2',
        'bmi' => 'decimal:2',
        'measured_at' => 'datetime',
    ];

    public function visit(): BelongsTo
    {
        return $this->belongsTo(Visit::class);
    }

    public function getBloodPressureAttribute(): string
    {
        return "{$this->blood_pressure_systolic}/{$this->blood_pressure_diastolic}";
    }
}
