<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use App\Models\Employee;
use App\Models\MedicalRecord;
use App\Models\VitalSign;
use App\Models\Prescription;
use App\Models\LabTest;
use App\Models\Medicine;
use App\Models\LabTestType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VisitController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search', '');
        $employees = [];

        if (strlen($search) >= 2) {
            $employees = Employee::with([
                'company:id,name,type',
                'department:id,name',
                'position:id,name',
            ])
                ->where('is_active', true)
                ->where(function ($query) use ($search) {
                    $query->where('name', 'like', '%' . $search . '%')
                        ->orWhere('employee_number', 'like', '%' . $search . '%')
                        ->orWhere('nik', 'like', '%' . $search . '%');
                })
                ->orderBy('name')
                ->limit(20)
                ->get()
                ->map(function ($emp) {
                    return [
                        'id' => $emp->id,
                        'employee_number' => $emp->employee_number,
                        'nik' => $emp->nik,
                        'name' => $emp->name,
                        'age' => $emp->age,
                        'gender' => $emp->gender,
                        'gender_label' => $emp->gender === 'male' ? 'Laki-laki' : 'Perempuan',
                        'company_id' => $emp->company_id,
                        'company_name' => $emp->company->name,
                        'company_type' => $emp->company->type,
                        'department_id' => $emp->department_id,
                        'department_name' => $emp->department?->name,
                        'position_id' => $emp->position_id,
                        'position_name' => $emp->position?->name,
                        'is_active' => $emp->is_active,
                    ];
                });
        }

        return Inertia::render('Kunjungan/Berobat/Index', [
            'employees' => $employees,
            'search' => $search,
        ]);
    }

    public function rekamMedis(Request $request)
    {
        $employeeId = $request->get('employee_id');

        // Get employee data
        $employee = Employee::with(['company', 'department', 'position'])
            ->find($employeeId);

        if (!$employee) {
            return redirect()->route('kunjungan.berobat.index');
        }

        // Get visit history with all related data
        $history = Visit::with([
            'medicalRecord',
            'vitalSigns',
            'prescriptions.medicine',
            'labTests.labTestType',
        ])
            ->where('employee_id', $employee->id)
            ->orderBy('visit_date', 'desc')
            ->get()
            ->map(function ($visit) use ($employee) {
                $vitalSign = $visit->vitalSigns->first();

                return [
                    'id' => $visit->id,
                    'employee' => $employee->name,
                    'company' => $employee->company->name,
                    'department' => $employee->department?->name,
                    'position' => $employee->position?->name,
                    'age' => $employee->age,
                    'date' => $visit->visit_date->format('Y-m-d'),
                    'time' => $visit->visit_time?->format('H:i'),
                    'workDay' => ucfirst($visit->work_day ?? ''),
                    'status' => ucfirst($visit->status ?? ''),
                    'actionStatus' => $visit->action_status ? ucwords(str_replace('_', ' ', $visit->action_status)) : null,
                    'complaint' => $visit->medicalRecord?->subjective,
                    'diagnosis' => $visit->medicalRecord?->assessment,
                    'plan' => $visit->medicalRecord?->plan,
                    'bp' => $vitalSign ? "{$vitalSign->blood_pressure_systolic}/{$vitalSign->blood_pressure_diastolic}" : null,
                    'pulse' => $vitalSign?->pulse,
                    'rr' => $vitalSign?->respiratory_rate,
                    'temp' => $vitalSign?->temperature,
                    'spo2' => $vitalSign?->spo2,
                    'medicines' => $visit->prescriptions->map(fn($p) => [
                        'name' => $p->medicine->name,
                        'qty' => $p->quantity,
                    ])->toArray(),
                    'labTests' => $visit->labTests->map(fn($l) => [
                        'type' => $l->labTestType->name,
                        'result' => $l->result_value . ' ' . $l->labTestType->unit,
                        'normal' => $l->is_normal,
                    ])->toArray(),
                    'pic' => $visit->picUser?->name ?? 'Admin',
                ];
            });

        return Inertia::render('Kunjungan/Berobat/RekamMedis', [
            'employee' => $employee->name,
            'employeeData' => [
                'id' => $employee->id,
                'name' => $employee->name,
                'company' => $employee->company->name,
                'department' => $employee->department?->name,
                'position' => $employee->position?->name,
                'age' => $employee->age,
                'gender' => $employee->gender,
            ],
            'history' => $history,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'visit_date' => 'required|date',
            'visit_time' => 'required',
            'visit_type' => 'required|in:berobat,mcu,prolanis,follow_up',
            'complaint' => 'nullable|string',
            'diagnosis' => 'nullable|string',
            'plan' => 'nullable|string',
            'bp_systolic' => 'nullable|integer',
            'bp_diastolic' => 'nullable|integer',
            'pulse' => 'nullable|integer',
            'rr' => 'nullable|integer',
            'temp' => 'nullable|numeric',
            'spo2' => 'nullable|integer',
            'medicines' => 'nullable|array',
            'action_status' => 'nullable|in:lanjut_kerja,pulang,dirujuk,rawat_inap',
        ]);

        // Generate visit number
        $visitNumber = 'VIS-' . date('Ymd') . '-' . str_pad(Visit::whereDate('visit_date', today())->count() + 1, 4, '0', STR_PAD_LEFT);

        $visit = Visit::create([
            'employee_id' => $validated['employee_id'],
            'visit_number' => $visitNumber,
            'visit_date' => $validated['visit_date'],
            'visit_time' => $validated['visit_time'],
            'visit_type' => $validated['visit_type'],
            'status' => 'completed',
            'action_status' => $validated['action_status'] ?? null,
            'pic_user_id' => \Illuminate\Support\Facades\Auth::id(),
        ]);

        // Create medical record (SOAP)
        if (!empty($validated['complaint']) || !empty($validated['diagnosis'])) {
            MedicalRecord::create([
                'visit_id' => $visit->id,
                'subjective' => $validated['complaint'] ?? null,
                'assessment' => $validated['diagnosis'] ?? null,
                'plan' => $validated['plan'] ?? null,
            ]);
        }

        // Create vital signs
        if (!empty($validated['bp_systolic'])) {
            VitalSign::create([
                'visit_id' => $visit->id,
                'blood_pressure_systolic' => $validated['bp_systolic'],
                'blood_pressure_diastolic' => $validated['bp_diastolic'],
                'pulse' => $validated['pulse'],
                'respiratory_rate' => $validated['rr'],
                'temperature' => $validated['temp'],
                'spo2' => $validated['spo2'],
            ]);
        }

        // Create prescriptions
        if (!empty($validated['medicines'])) {
            foreach ($validated['medicines'] as $med) {
                Prescription::create([
                    'visit_id' => $visit->id,
                    'medicine_id' => $med['medicine_id'],
                    'quantity' => $med['quantity'],
                    'dosage' => $med['dosage'] ?? null,
                    'frequency' => $med['frequency'] ?? null,
                ]);
            }
        }

        return redirect()->route('kunjungan.berobat.index')
            ->with('success', 'Kunjungan berhasil ditambahkan');
    }
}
