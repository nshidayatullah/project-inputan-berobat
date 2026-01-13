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
        Schema::create('medical_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('visit_id')->unique()->constrained()->cascadeOnDelete();
            $table->text('subjective')->nullable()->comment('S - Subjective: Patient complaints');
            $table->text('objective')->nullable()->comment('O - Objective: Clinical findings');
            $table->text('assessment')->nullable()->comment('A - Assessment: Diagnosis');
            $table->text('plan')->nullable()->comment('P - Plan: Treatment plan');
            $table->timestamps();

            // Note: For MySQL, add FULLTEXT index for fast search
            // $table->fullText(['subjective', 'assessment']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_records');
    }
};
