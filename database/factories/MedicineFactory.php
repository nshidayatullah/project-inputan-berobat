<?php

namespace Database\Factories;

use App\Models\Medicine;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Medicine>
 */
class MedicineFactory extends Factory
{
    protected $model = Medicine::class;

    public function definition(): array
    {
        $faker = \Faker\Factory::create('id_ID');

        $medicines = [
            ['name' => 'Paracetamol 500mg', 'generic' => 'Paracetamol', 'type' => 'Analgesik'],
            ['name' => 'Amoxicillin 500mg', 'generic' => 'Amoxicillin', 'type' => 'Antibiotik'],
            ['name' => 'Vitamin C 500mg', 'generic' => 'Ascorbic Acid', 'type' => 'Vitamin'],
            ['name' => 'Antasida Doen', 'generic' => 'Aluminium Hydroxide', 'type' => 'Antasida'],
            ['name' => 'Omeprazole 20mg', 'generic' => 'Omeprazole', 'type' => 'PPI'],
            ['name' => 'Cetirizine 10mg', 'generic' => 'Cetirizine', 'type' => 'Antihistamin'],
            ['name' => 'Ambroxol 30mg', 'generic' => 'Ambroxol', 'type' => 'Mukolitik'],
            ['name' => 'Ibuprofen 400mg', 'generic' => 'Ibuprofen', 'type' => 'NSAID'],
            ['name' => 'Metformin 500mg', 'generic' => 'Metformin', 'type' => 'Antidiabetes'],
            ['name' => 'Amlodipine 5mg', 'generic' => 'Amlodipine', 'type' => 'Antihipertensi'],
            ['name' => 'Lansoprazole 30mg', 'generic' => 'Lansoprazole', 'type' => 'PPI'],
            ['name' => 'Dexamethasone 0.5mg', 'generic' => 'Dexamethasone', 'type' => 'Kortikosteroid'],
            ['name' => 'Salbutamol Inhaler', 'generic' => 'Salbutamol', 'type' => 'Bronkodilator'],
            ['name' => 'OBH Combi', 'generic' => 'OBH', 'type' => 'Antitusif'],
            ['name' => 'Betadine Solution', 'generic' => 'Povidone Iodine', 'type' => 'Antiseptik'],
        ];

        $medicine = $faker->randomElement($medicines);

        return [
            'code' => strtoupper($faker->unique()->lexify('MED-???')) . $faker->numerify('##'),
            'name' => $medicine['name'],
            'generic_name' => $medicine['generic'],
            'type' => $medicine['type'],
            'unit' => $faker->randomElement(['Tablet', 'Kaplet', 'Kapsul', 'Sirup', 'Salep', 'Injeksi']),
            'stock' => $faker->numberBetween(10, 500),
            'min_stock' => $faker->numberBetween(5, 20),
            'is_active' => true,
        ];
    }
}
