<?php

namespace Database\Factories;

use App\Models\Position;
use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Position>
 */
class PositionFactory extends Factory
{
    protected $model = Position::class;

    public function definition(): array
    {
        $faker = \Faker\Factory::create('id_ID');

        $positions = [
            ['name' => 'Manager', 'level' => 'Manager'],
            ['name' => 'Supervisor', 'level' => 'Supervisor'],
            ['name' => 'Foreman', 'level' => 'Foreman'],
            ['name' => 'Staff', 'level' => 'Staff'],
            ['name' => 'Operator', 'level' => 'Staff'],
            ['name' => 'Teknisi', 'level' => 'Staff'],
            ['name' => 'Helper', 'level' => 'Staff'],
            ['name' => 'Driver', 'level' => 'Staff'],
            ['name' => 'Security', 'level' => 'Staff'],
            ['name' => 'Admin', 'level' => 'Staff'],
            ['name' => 'Engineer', 'level' => 'Supervisor'],
            ['name' => 'Koordinator', 'level' => 'Supervisor'],
        ];

        $position = $faker->randomElement($positions);

        return [
            'company_id' => Company::factory(),
            'code' => strtoupper($faker->unique()->lexify('POS-???')),
            'name' => $position['name'],
            'level' => $position['level'],
            'is_active' => true,
        ];
    }
}
