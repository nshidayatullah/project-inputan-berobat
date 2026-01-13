<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::with(['company:id,name,type'])
            ->withCount('employees')
            ->orderBy('company_id')
            ->orderBy('name')
            ->get()
            ->map(function ($dept) {
                return [
                    'id' => $dept->id,
                    'code' => $dept->code,
                    'name' => $dept->name,
                    'company_id' => $dept->company_id,
                    'company_name' => $dept->company->name,
                    'company_type' => $dept->company->type,
                    'is_kustodian' => $dept->is_kustodian,
                    'is_active' => $dept->is_active,
                    'employees_count' => $dept->employees_count,
                ];
            });

        $companies = Company::where('is_active', true)
            ->select('id', 'name', 'type')
            ->orderBy('name')
            ->get();

        return Inertia::render('Master/Departemen/Index', [
            'departments' => $departments,
            'companies' => $companies,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_id' => 'required|exists:companies,id',
            'code' => 'required|string|max:50',
            'name' => 'required|string|max:255',
            'is_kustodian' => 'boolean',
        ]);

        Department::create($validated);

        return redirect()->route('master.departemen.index')
            ->with('success', 'Departemen berhasil ditambahkan');
    }

    public function update(Request $request, Department $department)
    {
        $validated = $request->validate([
            'company_id' => 'required|exists:companies,id',
            'code' => 'required|string|max:50',
            'name' => 'required|string|max:255',
            'is_kustodian' => 'boolean',
        ]);

        $department->update($validated);

        return redirect()->route('master.departemen.index')
            ->with('success', 'Departemen berhasil diupdate');
    }

    public function destroy(Department $department)
    {
        $department->delete();

        return redirect()->route('master.departemen.index')
            ->with('success', 'Departemen berhasil dihapus');
    }
}
