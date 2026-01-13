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
        Schema::create('lab_tests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('visit_id')->constrained()->cascadeOnDelete();
            $table->foreignId('lab_test_type_id')->constrained()->restrictOnDelete();
            $table->string('result_value')->nullable()->comment('numeric result');
            $table->text('result_text')->nullable()->comment('text result or notes');
            $table->boolean('is_normal')->default(true);
            $table->timestamp('tested_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            // Indexes
            $table->index('visit_id');
            $table->index('lab_test_type_id');
            $table->index('is_normal');
            $table->index(['visit_id', 'lab_test_type_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lab_tests');
    }
};
