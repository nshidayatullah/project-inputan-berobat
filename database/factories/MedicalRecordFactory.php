<?php

namespace Database\Factories;

use App\Models\MedicalRecord;
use App\Models\Visit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MedicalRecord>
 */
class MedicalRecordFactory extends Factory
{
    protected $model = MedicalRecord::class;

    public function definition(): array
    {
        $faker = \Faker\Factory::create('id_ID');

        $complaints = [
            'Demam sejak 2 hari yang lalu, disertai batuk dan pilek',
            'Nyeri kepala berdenyut, tidak menjalar, skala 6/10',
            'Batuk berdahak warna putih sejak 3 hari',
            'Mual muntah sejak tadi malam, tidak bisa makan',
            'Nyeri ulu hati, terasa panas di dada',
            'Gatal-gatal di seluruh badan setelah makan seafood',
            'Pusing berputar, mual, terutama saat bangun tidur',
            'Nyeri pinggang menjalar ke kaki kiri',
            'Sesak napas, wheezing, riwayat asma',
            'Diare cair 5x sejak semalam, tidak ada darah',
        ];

        $diagnoses = [
            'Febris + ISPA',
            'Cephalgia Tension Type',
            'Bronkitis Akut',
            'Gastritis Akut',
            'GERD',
            'Dermatitis Alergi',
            'Vertigo Perifer',
            'LBP Myogenic',
            'Asma Bronkial',
            'GEA',
            'Pharyngitis Akut',
            'Rhinitis Alergi',
            'Dispepsia',
            'Hipertensi Grade I'
        ];

        $plans = [
            'Terapi simptomatik, istirahat cukup, banyak minum air putih',
            'Edukasi gaya hidup sehat, kontrol 3 hari lagi jika tidak membaik',
            'Lanjut kerja dengan catatan tidak boleh kerja berat',
            'Istirahat 2 hari, kontrol ulang jika belum membaik',
            'Rujuk ke RS untuk pemeriksaan lebih lanjut',
        ];

        return [
            'visit_id' => Visit::factory(),
            'subjective' => $faker->randomElement($complaints),
            'objective' => 'Kesadaran: Composmentis, TD: ' . $faker->numberBetween(100, 140) . '/' . $faker->numberBetween(60, 90) . ' mmHg, Nadi: ' . $faker->numberBetween(60, 100) . 'x/mnt, RR: ' . $faker->numberBetween(16, 24) . 'x/mnt, Suhu: ' . $faker->randomFloat(1, 36, 39) . '°C',
            'assessment' => $faker->randomElement($diagnoses),
            'plan' => $faker->randomElement($plans),
        ];
    }
}
