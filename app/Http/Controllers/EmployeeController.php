<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Company;
use App\Models\Department;
use App\Models\Position;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $query = Employee::with([
            'company:id,name,type',
            'department:id,name',
            'position:id,name,level'
        ]);

        // Filter by company
        if ($request->filled('company_id')) {
            $query->where('company_id', $request->company_id);
        }

        // Search by name
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $employees = $query->orderBy('name')
            ->paginate(20)
            ->through(function ($emp) {
                return [
                    'id' => $emp->id,
                    'medical_record_number' => $emp->medical_record_number,
                    'employee_number' => $emp->employee_number,
                    'nik_bib' => $emp->nik_bib,
                    'nik' => $emp->nik,
                    'name' => $emp->name,
                    'date_of_birth' => $emp->date_of_birth?->format('Y-m-d'),
                    'age' => $emp->age,
                    'gender' => $emp->gender,
                    'gender_label' => $emp->gender === 'male' ? 'Laki-laki' : 'Perempuan',
                    'phone' => $emp->phone,
                    'email' => $emp->email,
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

        $companies = Company::where('is_active', true)
            ->select('id', 'name', 'type')
            ->orderBy('name')
            ->get();

        return Inertia::render('Master/Karyawan/Index', [
            'employees' => $employees,
            'companies' => $companies,
            'filters' => $request->only(['company_id', 'search']),
        ]);
    }

    public function create()
    {
        $companies = Company::where('is_active', true)
            ->select('id', 'name', 'type')
            ->orderBy('name')
            ->get();

        return Inertia::render('Master/Karyawan/Create', [
            'companies' => $companies,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_id' => 'required|exists:companies,id',
            'department_id' => 'nullable|exists:departments,id',
            'position_id' => 'nullable|exists:positions,id',
            'employee_number' => 'required|string|max:50|unique:employees',
            'nik_bib' => ['nullable', 'string', 'max:20', 'regex:/^C-\d+$/'],
            'nik' => 'nullable|string|max:20|unique:employees',
            'name' => 'required|string|max:255',
            'date_of_birth' => 'nullable|date',
            'gender' => 'required|in:male,female',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
            'address' => 'nullable|string',
            'blood_type' => 'nullable|in:A,B,AB,O,unknown',
            'emergency_contact_name' => 'nullable|string|max:255',
            'emergency_contact_phone' => 'nullable|string|max:20',
        ]);

        // Generate Medical Record Number
        $company = Company::findOrFail($request->company_id);
        $count = Employee::where('company_id', $request->company_id)->count();
        $sequence = str_pad($count + 1, 5, '0', STR_PAD_LEFT);
        $validated['medical_record_number'] = "{$company->code}-{$sequence}";

        Employee::create($validated);

        return redirect()->route('master.karyawan.index')
            ->with('success', 'Karyawan berhasil ditambahkan');
    }

    public function edit(Employee $employee)
    {
        $companies = Company::where('is_active', true)
            ->select('id', 'name', 'type')
            ->orderBy('name')
            ->get();

        return Inertia::render('Master/Karyawan/Edit', [
            'employee' => $employee,
            'companies' => $companies,
        ]);
    }

    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'company_id' => 'required|exists:companies,id',
            'department_id' => 'nullable|exists:departments,id',
            'position_id' => 'nullable|exists:positions,id',
            'employee_number' => 'required|string|max:50|unique:employees,employee_number,' . $employee->id,
            'nik_bib' => ['nullable', 'string', 'max:20', 'regex:/^C-\d+$/'],
            'nik' => 'nullable|string|max:20|unique:employees,nik,' . $employee->id,
            'name' => 'required|string|max:255',
            'date_of_birth' => 'nullable|date',
            'gender' => 'required|in:male,female',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
            'address' => 'nullable|string',
            'blood_type' => 'nullable|in:A,B,AB,O,unknown',
            'emergency_contact_name' => 'nullable|string|max:255',
            'emergency_contact_phone' => 'nullable|string|max:20',
        ]);

        $employee->update($validated);

        return redirect()->route('master.karyawan.index')
            ->with('success', 'Karyawan berhasil diupdate');
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect()->route('master.karyawan.index')
            ->with('success', 'Karyawan berhasil dihapus');
    }

    // API to get departments by company
    public function getDepartments(Company $company)
    {
        return Department::where('company_id', $company->id)
            ->where('is_active', true)
            ->select('id', 'name')
            ->orderBy('name')
            ->get();
    }

    // API to get positions by company
    public function getPositions(Company $company)
    {
        return Position::where('company_id', $company->id)
            ->where('is_active', true)
            ->select('id', 'name', 'level')
            ->orderBy('name')
            ->get();
    }
}
