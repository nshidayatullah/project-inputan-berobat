<?php

namespace Database\Factories;

use App\Models\LabTestType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LabTestType>
 */
class LabTestTypeFactory extends Factory
{
    protected $model = LabTestType::class;

    public function definition(): array
    {
        $faker = \Faker\Factory::create('id_ID');

        $labTests = [
            ['name' => 'Gula Darah Sewaktu', 'category' => 'Kimia Darah', 'unit' => 'mg/dL', 'min' => 70, 'max' => 200],
            ['name' => 'Gula Darah Puasa', 'category' => 'Kimia Darah', 'unit' => 'mg/dL', 'min' => 70, 'max' => 100],
            ['name' => 'Hemoglobin', 'category' => 'Hematologi', 'unit' => 'g/dL', 'min' => 12, 'max' => 17],
            ['name' => 'Cholesterol Total', 'category' => 'Kimia Darah', 'unit' => 'mg/dL', 'min' => 0, 'max' => 200],
            ['name' => 'Trigliserida', 'category' => 'Kimia Darah', 'unit' => 'mg/dL', 'min' => 0, 'max' => 150],
            ['name' => 'Asam Urat', 'category' => 'Kimia Darah', 'unit' => 'mg/dL', 'min' => 3, 'max' => 7],
            ['name' => 'SGOT', 'category' => 'Fungsi Hati', 'unit' => 'U/L', 'min' => 0, 'max' => 40],
            ['name' => 'SGPT', 'category' => 'Fungsi Hati', 'unit' => 'U/L', 'min' => 0, 'max' => 41],
            ['name' => 'Ureum', 'category' => 'Fungsi Ginjal', 'unit' => 'mg/dL', 'min' => 15, 'max' => 40],
            ['name' => 'Creatinin', 'category' => 'Fungsi Ginjal', 'unit' => 'mg/dL', 'min' => 0.6, 'max' => 1.2],
            ['name' => 'HbA1c', 'category' => 'Diabetes', 'unit' => '%', 'min' => 4, 'max' => 5.7],
        ];

        $test = $faker->randomElement($labTests);

        return [
            'code' => strtoupper($faker->unique()->lexify('LAB-???')),
            'name' => $test['name'],
            'category' => $test['category'],
            'unit' => $test['unit'],
            'normal_range_min' => $test['min'],
            'normal_range_max' => $test['max'],
            'is_active' => true,
        ];
    }
}
