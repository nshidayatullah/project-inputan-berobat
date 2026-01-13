<?php

namespace Database\Factories;

use App\Models\Diagnosis;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Diagnosis>
 */
class DiagnosisFactory extends Factory
{
    protected $model = Diagnosis::class;

    protected static $usedCodes = [];

    public function definition(): array
    {
        $faker = \Faker\Factory::create('id_ID');

        $diagnoses = [
            ['code' => 'J00', 'name_id' => 'Nasofaringitis Akut (Common Cold)', 'name_en' => 'Acute Nasopharyngitis', 'category' => 'Penyakit Saluran Napas'],
            ['code' => 'J06.9', 'name_id' => 'Infeksi Saluran Pernapasan Atas Akut', 'name_en' => 'Acute Upper Respiratory Infection', 'category' => 'Penyakit Saluran Napas'],
            ['code' => 'R51', 'name_id' => 'Nyeri Kepala', 'name_en' => 'Headache', 'category' => 'Gejala Umum'],
            ['code' => 'K29.7', 'name_id' => 'Gastritis', 'name_en' => 'Gastritis, Unspecified', 'category' => 'Penyakit Pencernaan'],
            ['code' => 'K21.0', 'name_id' => 'GERD', 'name_en' => 'Gastroesophageal Reflux Disease', 'category' => 'Penyakit Pencernaan'],
            ['code' => 'L30.9', 'name_id' => 'Dermatitis', 'name_en' => 'Dermatitis, Unspecified', 'category' => 'Penyakit Kulit'],
            ['code' => 'M54.5', 'name_id' => 'Nyeri Punggung Bawah', 'name_en' => 'Low Back Pain', 'category' => 'Penyakit Muskuloskeletal'],
            ['code' => 'I10', 'name_id' => 'Hipertensi Esensial', 'name_en' => 'Essential Hypertension', 'category' => 'Penyakit Kardiovaskular'],
            ['code' => 'E11.9', 'name_id' => 'Diabetes Mellitus Tipe 2', 'name_en' => 'Type 2 Diabetes Mellitus', 'category' => 'Penyakit Metabolik'],
            ['code' => 'J45.9', 'name_id' => 'Asma Bronkial', 'name_en' => 'Asthma, Unspecified', 'category' => 'Penyakit Saluran Napas'],
            ['code' => 'A09', 'name_id' => 'Diare dan Gastroenteritis', 'name_en' => 'Diarrhoea and Gastroenteritis', 'category' => 'Penyakit Pencernaan'],
            ['code' => 'J02.9', 'name_id' => 'Faringitis Akut', 'name_en' => 'Acute Pharyngitis', 'category' => 'Penyakit Saluran Napas'],
            ['code' => 'J03.9', 'name_id' => 'Tonsilitis Akut', 'name_en' => 'Acute Tonsillitis', 'category' => 'Penyakit Saluran Napas'],
            ['code' => 'H10.9', 'name_id' => 'Konjungtivitis', 'name_en' => 'Conjunctivitis, Unspecified', 'category' => 'Penyakit Mata'],
            ['code' => 'B34.9', 'name_id' => 'Infeksi Virus', 'name_en' => 'Viral Infection, Unspecified', 'category' => 'Penyakit Infeksi'],
        ];

        // Get unused diagnoses
        $availableDiagnoses = array_filter($diagnoses, function ($d) {
            return !in_array($d['code'], self::$usedCodes);
        });

        // If all used, reset and start over
        if (empty($availableDiagnoses)) {
            self::$usedCodes = [];
            $availableDiagnoses = $diagnoses;
        }

        $diagnosis = $faker->randomElement(array_values($availableDiagnoses));
        self::$usedCodes[] = $diagnosis['code'];

        return [
            'icd10_code' => $diagnosis['code'],
            'name_id' => $diagnosis['name_id'],
            'name_en' => $diagnosis['name_en'],
            'category' => $diagnosis['category'],
            'is_active' => true,
        ];
    }
}
