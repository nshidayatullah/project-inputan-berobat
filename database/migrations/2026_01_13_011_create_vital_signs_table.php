<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vital_signs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('visit_id')->constrained()->cascadeOnDelete();
            $table->integer('blood_pressure_systolic')->nullable();
            $table->integer('blood_pressure_diastolic')->nullable();
            $table->integer('pulse')->nullable()->comment('beats per minute');
            $table->integer('respiratory_rate')->nullable()->comment('breaths per minute');
            $table->decimal('temperature', 4, 1)->nullable()->comment('celsius');
            $table->integer('spo2')->nullable()->comment('oxygen saturation %');
            $table->decimal('weight', 5, 2)->nullable()->comment('kg');
            $table->decimal('height', 5, 2)->nullable()->comment('cm');
            $table->decimal('bmi', 5, 2)->nullable()->comment('body mass index');
            $table->timestamp('measured_at')->useCurrent();
            $table->timestamps();

            // Index
            $table->index('visit_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vital_signs');
    }
};
