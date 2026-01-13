<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    protected $model = Company::class;

    public function definition(): array
    {
        $faker = \Faker\Factory::create('id_ID');

        $companyPrefixes = ['PT', 'CV', 'UD', 'Firma'];
        $companyNames = [
            'Sejahtera Abadi',
            'Maju Jaya',
            'Teknologi Digital',
            'Sumber Makmur',
            'Bangun Negeri',
            'Karya Mandiri',
            'Cipta Kreasi',
            'Bumi Persada',
            'Cahaya Nusantara',
            'Prima Sukses',
            'Mega Utama',
            'Global Sentosa',
            'Inti Perkasa',
            'Jaya Konstruksi',
            'Bintang Timur',
            'Harapan Baru'
        ];

        $prefix = $faker->randomElement($companyPrefixes);
        $name = $faker->randomElement($companyNames);

        return [
            'code' => strtoupper($faker->unique()->lexify('???')) . $faker->unique()->numerify('###'),
            'name' => "{$prefix} {$name}",
            'type' => $faker->randomElement(['main_contractor', 'sub_contractor']),
            'address' => $faker->address(),
            'phone' => $faker->phoneNumber(),
            'email' => $faker->companyEmail(),
            'pic_name' => $faker->name(),
            'pic_phone' => $faker->phoneNumber(),
            'is_active' => true,
        ];
    }

    public function mainContractor(): static
    {
        return $this->state(fn(array $attributes) => [
            'type' => 'main_contractor',
            'name' => 'PT Putra Perkasa Abadi',
            'code' => 'PPA001',
        ]);
    }

    public function subContractor(): static
    {
        return $this->state(fn(array $attributes) => [
            'type' => 'sub_contractor',
        ]);
    }
}
