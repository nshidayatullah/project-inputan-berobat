<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Company;
use App\Models\Department;
use App\Models\Position;
use App\Models\Employee;
use App\Models\Medicine;
use App\Models\LabTestType;
use App\Models\Diagnosis;
use App\Models\Visit;
use App\Models\MedicalRecord;
use App\Models\VitalSign;
use App\Models\Prescription;
use App\Models\LabTest;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin User
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('12345678'),
        ]);

        // Create Main Contractor (PPA)
        $ppa = Company::factory()->create([
            'code' => 'PPA001',
            'name' => 'PT Putra Perkasa Abadi',
            'type' => 'main_contractor',
        ]);

        // Create Departments for PPA (some as Kustodian)
        $kustodianProduksi = Department::factory()->create([
            'company_id' => $ppa->id,
            'code' => 'KUST-PROD',
            'name' => 'Kustodian Produksi',
            'is_kustodian' => true,
        ]);

        $kustodianMaintenance = Department::factory()->create([
            'company_id' => $ppa->id,
            'code' => 'KUST-MAINT',
            'name' => 'Kustodian Maintenance',
            'is_kustodian' => true,
        ]);

        $deptHRD = Department::factory()->create([
            'company_id' => $ppa->id,
            'code' => 'DEPT-HRD',
            'name' => 'HRD',
            'is_kustodian' => false,
        ]);

        // Create Positions for PPA
        $ppaPositions = [];
        foreach (['Manager', 'Supervisor', 'Staff', 'Admin'] as $posName) {
            $ppaPositions[] = Position::factory()->create([
                'company_id' => $ppa->id,
                'name' => $posName,
            ]);
        }

        // Create Employees for PPA
        foreach ($ppaPositions as $position) {
            Employee::factory()->count(3)->create([
                'company_id' => $ppa->id,
                'department_id' => $deptHRD->id,
                'position_id' => $position->id,
            ]);
        }

        // Create Subcontractors
        $subcontractors = Company::factory()->count(3)->subContractor()->create();

        foreach ($subcontractors as $subcon) {
            // Attach to kustodian
            $subcon->kustodians()->attach($kustodianProduksi->id);

            // Create departments for subcontractor
            $subconDept = Department::factory()->create([
                'company_id' => $subcon->id,
                'is_kustodian' => false,
            ]);

            // Create positions for subcontractor
            $subconPositions = Position::factory()->count(3)->create([
                'company_id' => $subcon->id,
            ]);

            // Create employees for subcontractor
            foreach ($subconPositions as $position) {
                Employee::factory()->count(5)->create([
                    'company_id' => $subcon->id,
                    'department_id' => $subconDept->id,
                    'position_id' => $position->id,
                ]);
            }
        }

        // Create Medicines
        Medicine::factory()->count(15)->create();

        // Create Lab Test Types
        LabTestType::factory()->count(10)->create();

        // Create Diagnoses
        Diagnosis::factory()->count(10)->create();

        // Create Visits with related data
        $employees = Employee::all();
        foreach ($employees->random(min(20, $employees->count())) as $employee) {
            $visit = Visit::factory()->create([
                'employee_id' => $employee->id,
            ]);

            // Create Medical Record
            MedicalRecord::factory()->create([
                'visit_id' => $visit->id,
            ]);

            // Create Vital Signs
            VitalSign::factory()->create([
                'visit_id' => $visit->id,
            ]);

            // Create Prescriptions
            $medicines = Medicine::inRandomOrder()->take(rand(1, 3))->get();
            foreach ($medicines as $medicine) {
                Prescription::factory()->create([
                    'visit_id' => $visit->id,
                    'medicine_id' => $medicine->id,
                ]);
            }

            // Create Lab Tests
            $labTypes = LabTestType::inRandomOrder()->take(rand(0, 2))->get();
            foreach ($labTypes as $labType) {
                LabTest::factory()->create([
                    'visit_id' => $visit->id,
                    'lab_test_type_id' => $labType->id,
                ]);
            }
        }

        $this->command->info('✅ Seeding completed!');
        $this->command->info('   - 1 Admin User');
        $this->command->info('   - 1 Main Contractor (PPA) + 3 Subcontractors');
        $this->command->info('   - ' . Department::count() . ' Departments');
        $this->command->info('   - ' . Position::count() . ' Positions');
        $this->command->info('   - ' . Employee::count() . ' Employees');
        $this->command->info('   - ' . Medicine::count() . ' Medicines');
        $this->command->info('   - ' . Visit::count() . ' Visits with Medical Records');
    }
}
