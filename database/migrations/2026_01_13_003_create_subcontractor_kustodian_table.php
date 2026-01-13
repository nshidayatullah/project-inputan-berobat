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
        Schema::create('subcontractor_kustodian', function (Blueprint $table) {
            $table->id();
            $table->foreignId('subcontractor_id')->constrained('companies')->cascadeOnDelete();
            $table->foreignId('kustodian_id')->constrained('departments')->cascadeOnDelete();
            $table->timestamps();

            // Unique constraint to prevent duplicates
            $table->unique(['subcontractor_id', 'kustodian_id'], 'subcon_kustodian_unique');

            // Indexes
            $table->index('subcontractor_id');
            $table->index('kustodian_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subcontractor_kustodian');
    }
};
