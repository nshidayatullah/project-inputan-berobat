<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\VisitController;
use App\Http\Controllers\MedicineController;
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

// Master Data Routes
Route::middleware(['auth', 'verified'])->prefix('master')->name('master.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Master/Index');
    })->name('index');

    // Perusahaan (Companies)
    Route::get('/perusahaan', [CompanyController::class, 'index'])->name('perusahaan.index');
    Route::post('/perusahaan', [CompanyController::class, 'store'])->name('perusahaan.store');
    Route::put('/perusahaan/{company}', [CompanyController::class, 'update'])->name('perusahaan.update');
    Route::delete('/perusahaan/{company}', [CompanyController::class, 'destroy'])->name('perusahaan.destroy');

    // Departemen (Departments)
    Route::get('/departemen', [DepartmentController::class, 'index'])->name('departemen.index');
    Route::post('/departemen', [DepartmentController::class, 'store'])->name('departemen.store');
    Route::put('/departemen/{department}', [DepartmentController::class, 'update'])->name('departemen.update');
    Route::delete('/departemen/{department}', [DepartmentController::class, 'destroy'])->name('departemen.destroy');

    // Jabatan (Positions)
    Route::get('/jabatan', [PositionController::class, 'index'])->name('jabatan.index');
    Route::post('/jabatan', [PositionController::class, 'store'])->name('jabatan.store');
    Route::put('/jabatan/{position}', [PositionController::class, 'update'])->name('jabatan.update');
    Route::delete('/jabatan/{position}', [PositionController::class, 'destroy'])->name('jabatan.destroy');

    // Karyawan (Employees)
    Route::get('/karyawan', [EmployeeController::class, 'index'])->name('karyawan.index');
    Route::get('/karyawan/create', [EmployeeController::class, 'create'])->name('karyawan.create'); // New Route
    Route::post('/karyawan', [EmployeeController::class, 'store'])->name('karyawan.store');
    Route::get('/karyawan/{employee}/edit', [EmployeeController::class, 'edit'])->name('karyawan.edit'); // New Route
    Route::put('/karyawan/{employee}', [EmployeeController::class, 'update'])->name('karyawan.update');
    Route::delete('/karyawan/{employee}', [EmployeeController::class, 'destroy'])->name('karyawan.destroy');

    // API for dropdowns
    Route::get('/karyawan/departments/{company}', [EmployeeController::class, 'getDepartments'])->name('karyawan.departments');
    Route::get('/karyawan/positions/{company}', [EmployeeController::class, 'getPositions'])->name('karyawan.positions');

    // ICD10
    Route::get('/icd10', function () {
        return Inertia::render('Master/ICD10/Index');
    })->name('icd10.index');
});

// Obat Routes
Route::middleware(['auth', 'verified'])->prefix('obat')->name('obat.')->group(function () {
    Route::get('/', function () {
        $medicines = \App\Models\Medicine::orderBy('name')->get();
        return Inertia::render('Obat/Index', ['medicines' => $medicines]);
    })->name('index');
});

// Kunjungan Routes
Route::middleware(['auth', 'verified'])->prefix('kunjungan')->name('kunjungan.')->group(function () {
    // Berobat
    Route::get('/berobat', [VisitController::class, 'index'])->name('berobat.index');
    Route::get('/berobat/create', [VisitController::class, 'create'])->name('berobat.create');
    Route::post('/berobat', [VisitController::class, 'store'])->name('berobat.store');
    Route::get('/berobat/{visit}/edit', [VisitController::class, 'edit'])->name('berobat.edit');
    Route::put('/berobat/{visit}', [VisitController::class, 'update'])->name('berobat.update');
    Route::get('/berobat/rekam-medis', [VisitController::class, 'rekamMedis'])->name('berobat.rekam-medis');

    // Follow-up MCU
    Route::get('/follow-up-mcu', function () {
        return Inertia::render('Kunjungan/FollowUpMCU/Index');
    })->name('follow-up-mcu.index');

    // Prolanis
    Route::get('/prolanis', function () {
        return Inertia::render('Kunjungan/Prolanis/Index');
    })->name('prolanis.index');
});

// Rekam Medis Routes
Route::get('/rekam-medis', function () {
    return Inertia::render('RekamMedis/Index');
})->middleware(['auth', 'verified'])->name('rekam-medis.index');

// User Management Routes
Route::get('/user-management', function () {
    return Inertia::render('UserManagement/Index');
})->middleware(['auth', 'verified'])->name('user-management.index');

// Profile Routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
