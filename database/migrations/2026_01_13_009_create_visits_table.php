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
        Schema::create('visits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->restrictOnDelete();
            $table->string('visit_number', 50)->unique();
            $table->date('visit_date');
            $table->time('visit_time');
            $table->enum('visit_type', ['berobat', 'mcu', 'prolanis', 'follow_up']);
            $table->enum('work_day', ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'])->nullable();
            $table->enum('status', ['pending', 'in_progress', 'completed', 'cancelled'])->default('pending');
            $table->enum('action_status', ['lanjut_kerja', 'pulang', 'dirujuk', 'rawat_inap'])->nullable();
            $table->foreignId('pic_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // Indexes for fast querying
            $table->index('visit_date');
            $table->index('visit_type');
            $table->index('status');
            $table->index('action_status');
            $table->index(['employee_id', 'visit_date']);
            $table->index(['visit_type', 'status']);
            $table->index(['visit_date', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visits');
    }
};
