<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/master', function () {
    return Inertia::render('Master/Index');
})->middleware(['auth', 'verified'])->name('master.index');

Route::get('/master/perusahaan', function () {
    return Inertia::render('Master/Perusahaan/Index');
})->middleware(['auth', 'verified'])->name('master.perusahaan.index');

Route::get('/master/departemen', function () {
    return Inertia::render('Master/Departemen/Index');
})->middleware(['auth', 'verified'])->name('master.departemen.index');

Route::get('/master/jabatan', function () {
    return Inertia::render('Master/Jabatan/Index');
})->middleware(['auth', 'verified'])->name('master.jabatan.index');

Route::get('/master/karyawan', function () {
    return Inertia::render('Master/Karyawan/Index');
})->middleware(['auth', 'verified'])->name('master.karyawan.index');

Route::get('/obat', function () {
    return Inertia::render('Obat/Index');
})->middleware(['auth', 'verified'])->name('obat.index');

Route::get('/master/icd10', function () {
    return Inertia::render('Master/ICD10/Index');
})->middleware(['auth', 'verified'])->name('master.icd10.index');

Route::get('/kunjungan/berobat', function () {
    return Inertia::render('Kunjungan/Berobat/Index');
})->middleware(['auth', 'verified'])->name('kunjungan.berobat.index');

Route::get('/kunjungan/berobat/rekam-medis', function () {
    $employee = request()->get('employee', 'Unknown');

    // Dummy data - in production, fetch from database
    $allHistory = [
        [
            'id' => 1,
            'employee' => 'Budi Santoso',
            'company' => 'PT Sejahtera Abadi',
            'department' => 'IT',
            'position' => 'Staff',
            'age' => 30,
            'medicines' => [
                ['name' => 'Paracetamol', 'qty' => 2],
                ['name' => 'Vitamin C', 'qty' => 1]
            ],
            'complaint' => 'Demam, Pusing, Batuk',
            'diagnosis' => 'Febris + ISPA',
            'workDay' => 'Senin',
            'actionStatus' => 'Lanjut Kerja',
            'bp' => '120/80',
            'pulse' => 80,
            'rr' => 20,
            'temp' => 38.5,
            'spo2' => 98,
            'labTests' => [
                ['type' => 'Gula Darah Sewaktu', 'result' => '110 mg/dL', 'normal' => true],
            ],
            'pic' => 'Dr. Setiawan',
            'time' => '09:00',
            'status' => 'Selesai',
            'date' => '2023-10-25',
        ],
        [
            'id' => 2,
            'employee' => 'Siti Aminah',
            'company' => 'CV Maju Jaya',
            'department' => 'Finance',
            'position' => 'SPV',
            'age' => 28,
            'medicines' => [
                ['name' => 'Amoxicillin', 'qty' => 3],
                ['name' => 'Antasida', 'qty' => 1]
            ],
            'complaint' => 'Sakit tenggorokan, Nyeri ulu hati',
            'diagnosis' => 'Faringitis + Gastritis',
            'workDay' => 'Selasa',
            'actionStatus' => 'Pulang',
            'bp' => '110/70',
            'pulse' => 88,
            'rr' => 18,
            'temp' => 37.2,
            'spo2' => 99,
            'labTests' => [
                ['type' => 'Hemoglobin', 'result' => '12.5 g/dL', 'normal' => true],
                ['type' => 'Cholesterol', 'result' => '220 mg/dL', 'normal' => false]
            ],
            'pic' => 'Perawat Rina',
            'time' => '10:30',
            'status' => 'Selesai',
            'date' => '2023-10-24',
        ],
        [
            'id' => 4,
            'employee' => 'Budi Santoso',
            'company' => 'PT Sejahtera Abadi',
            'department' => 'IT',
            'position' => 'Staff',
            'age' => 30,
            'medicines' => [['name' => 'Ambroxol', 'qty' => 2]],
            'complaint' => 'Batuk berdahak',
            'diagnosis' => 'Bronkitis Akut',
            'workDay' => 'Kamis',
            'actionStatus' => 'Lanjut Kerja',
            'bp' => '125/82',
            'pulse' => 78,
            'rr' => 19,
            'temp' => 37.0,
            'spo2' => 97,
            'labTests' => [],
            'pic' => 'Dr. Setiawan',
            'time' => '08:30',
            'status' => 'Selesai',
            'date' => '2023-10-20',
        ],
        [
            'id' => 5,
            'employee' => 'Budi Santoso',
            'company' => 'PT Sejahtera Abadi',
            'department' => 'IT',
            'position' => 'Staff',
            'age' => 30,
            'medicines' => [['name' => 'Cetirizine', 'qty' => 1]],
            'complaint' => 'Gatal-gatal, Alergi',
            'diagnosis' => 'Dermatitis Alergi',
            'workDay' => 'Rabu',
            'actionStatus' => 'Pulang',
            'bp' => '118/78',
            'pulse' => 76,
            'rr' => 18,
            'temp' => 36.6,
            'spo2' => 99,
            'labTests' => [
                ['type' => 'Hemoglobin', 'result' => '14.5 g/dL', 'normal' => true]
            ],
            'pic' => 'Perawat Rina',
            'time' => '11:00',
            'status' => 'Selesai',
            'date' => '2023-10-15',
        ],
    ];

    // Filter history for selected employee and sort by date (newest first)
    $history = collect($allHistory)
        ->filter(fn($record) => $record['employee'] === $employee)
        ->sortByDesc('date')
        ->values()
        ->all();

    return Inertia::render('Kunjungan/Berobat/RekamMedis', [
        'employee' => $employee,
        'history' => $history,
    ]);
})->middleware(['auth', 'verified'])->name('kunjungan.berobat.rekam-medis');


Route::get('/kunjungan/follow-up-mcu', function () {
    return Inertia::render('Kunjungan/FollowUpMCU/Index');
})->middleware(['auth', 'verified'])->name('kunjungan.follow-up-mcu.index');

Route::get('/kunjungan/prolanis', function () {
    return Inertia::render('Kunjungan/Prolanis/Index');
})->middleware(['auth', 'verified'])->name('kunjungan.prolanis.index');

Route::get('/rekam-medis', function () {
    return Inertia::render('RekamMedis/Index');
})->middleware(['auth', 'verified'])->name('rekam-medis.index');

Route::get('/user-management', function () {
    return Inertia::render('UserManagement/Index');
})->middleware(['auth', 'verified'])->name('user-management.index');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
