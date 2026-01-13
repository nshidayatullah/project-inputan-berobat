<?php

namespace Database\Factories;

use App\Models\Department;
use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Department>
 */
class DepartmentFactory extends Factory
{
    protected $model = Department::class;

    public function definition(): array
    {
        $faker = \Faker\Factory::create('id_ID');

        $departments = [
            'Produksi',
            'Maintenance',
            'Utility',
            'Warehouse',
            'Quality Control',
            'HSE',
            'HRD',
            'Finance',
            'IT',
            'Procurement',
            'Engineering',
            'Logistik',
            'Operasional',
            'Administrasi',
            'Marketing',
            'Legal'
        ];

        return [
            'company_id' => Company::factory(),
            'code' => strtoupper($faker->unique()->lexify('DEPT-???')),
            'name' => $faker->randomElement($departments),
            'is_kustodian' => false,
            'is_active' => true,
        ];
    }

    public function kustodian(): static
    {
        return $this->state(fn(array $attributes) => [
            'is_kustodian' => true,
        ]);
    }
}
