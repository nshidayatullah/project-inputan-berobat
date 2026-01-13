<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LabTest extends Model
{
    use HasFactory;

    protected $fillable = [
        'visit_id',
        'lab_test_type_id',
        'result_value',
        'result_text',
        'is_normal',
        'tested_at',
        'notes',
    ];

    protected $casts = [
        'is_normal' => 'boolean',
        'tested_at' => 'datetime',
    ];

    public function visit(): BelongsTo
    {
        return $this->belongsTo(Visit::class);
    }

    public function labTestType(): BelongsTo
    {
        return $this->belongsTo(LabTestType::class);
    }
}
