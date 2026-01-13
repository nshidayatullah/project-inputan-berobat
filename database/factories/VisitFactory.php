<?php

namespace Database\Factories;

use App\Models\Visit;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Visit>
 */
class VisitFactory extends Factory
{
    protected $model = Visit::class;

    public function definition(): array
    {
        $faker = \Faker\Factory::create('id_ID');

        $visitDate = $faker->dateTimeBetween('-1 year', 'now');
        $dayOfWeek = strtolower(date('l', $visitDate->getTimestamp()));
        $workDays = [
            'monday' => 'senin',
            'tuesday' => 'selasa',
            'wednesday' => 'rabu',
            'thursday' => 'kamis',
            'friday' => 'jumat',
            'saturday' => 'sabtu',
            'sunday' => 'minggu',
        ];

        return [
            'employee_id' => Employee::factory(),
            'visit_number' => 'VIS-' . $faker->unique()->numerify('######'),
            'visit_date' => $visitDate,
            'visit_time' => $faker->time('H:i:s'),
            'visit_type' => $faker->randomElement(['berobat', 'mcu', 'prolanis', 'follow_up']),
            'work_day' => $workDays[$dayOfWeek] ?? 'senin',
            'status' => $faker->randomElement(['pending', 'in_progress', 'completed']),
            'action_status' => $faker->randomElement(['lanjut_kerja', 'pulang', 'dirujuk', null]),
            'pic_user_id' => null,
            'notes' => $faker->optional()->sentence(),
        ];
    }

    public function berobat(): static
    {
        return $this->state(fn(array $attributes) => [
            'visit_type' => 'berobat',
        ]);
    }

    public function mcu(): static
    {
        return $this->state(fn(array $attributes) => [
            'visit_type' => 'mcu',
        ]);
    }

    public function completed(): static
    {
        return $this->state(fn(array $attributes) => [
            'status' => 'completed',
        ]);
    }
}
