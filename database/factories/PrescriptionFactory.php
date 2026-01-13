<?php

namespace Database\Factories;

use App\Models\Prescription;
use App\Models\Visit;
use App\Models\Medicine;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Prescription>
 */
class PrescriptionFactory extends Factory
{
    protected $model = Prescription::class;

    public function definition(): array
    {
        $faker = \Faker\Factory::create('id_ID');

        $frequencies = [
            '3x1 sehari',
            '2x1 sehari',
            '1x1 sehari',
            '3x1 sesudah makan',
            '2x1 sebelum makan',
            'bila perlu',
            'sebelum tidur'
        ];

        return [
            'visit_id' => Visit::factory(),
            'medicine_id' => Medicine::factory(),
            'quantity' => $faker->numberBetween(1, 30),
            'dosage' => $faker->randomElement(['500mg', '250mg', '100mg', '50mg', '10mg']),
            'frequency' => $faker->randomElement($frequencies),
            'duration_days' => $faker->numberBetween(3, 14),
            'notes' => $faker->optional()->sentence(),
        ];
    }
}
