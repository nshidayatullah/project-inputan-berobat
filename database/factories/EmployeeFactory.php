<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\Company;
use App\Models\Department;
use App\Models\Position;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    protected $model = Employee::class;

    public function definition(): array
    {
        $faker = \Faker\Factory::create('id_ID');

        $gender = $faker->randomElement(['male', 'female']);
        $firstName = $gender === 'male' ? $faker->firstNameMale() : $faker->firstNameFemale();
        $lastName = $faker->lastName();

        return [
            'company_id' => Company::factory(),
            'department_id' => Department::factory(),
            'position_id' => Position::factory(),
            'employee_number' => 'EMP-' . $faker->unique()->randomNumber(8, true),
            'nik' => $faker->unique()->numerify('################'), // 16 digits NIK
            'name' => "{$firstName} {$lastName}",
            'date_of_birth' => $faker->dateTimeBetween('-55 years', '-18 years'),
            'gender' => $gender,
            'phone' => $faker->phoneNumber(),
            'email' => strtolower($firstName) . '.' . strtolower($lastName) . '@company.com',
            'address' => $faker->address(),
            'blood_type' => $faker->randomElement(['A', 'B', 'AB', 'O']),
            'emergency_contact_name' => $faker->name(),
            'emergency_contact_phone' => $faker->phoneNumber(),
            'is_active' => true,
        ];
    }

    public function male(): static
    {
        return $this->state(fn(array $attributes) => [
            'gender' => 'male',
        ]);
    }

    public function female(): static
    {
        return $this->state(fn(array $attributes) => [
            'gender' => 'female',
        ]);
    }
}
