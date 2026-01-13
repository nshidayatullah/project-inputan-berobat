<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function index()
    {
        $companies = Company::with(['departments' => function ($query) {
            $query->where('is_kustodian', false);
        }])
            ->withCount('employees')
            ->orderBy('type')
            ->orderBy('name')
            ->get()
            ->map(function ($company) {
                return [
                    'id' => $company->id,
                    'code' => $company->code,
                    'name' => $company->name,
                    'type' => $company->type,
                    'type_label' => $company->type === 'main_contractor' ? 'Main Contractor' : 'Sub Contractor',
                    'address' => $company->address,
                    'phone' => $company->phone,
                    'email' => $company->email,
                    'pic_name' => $company->pic_name,
                    'pic_phone' => $company->pic_phone,
                    'is_active' => $company->is_active,
                    'employees_count' => $company->employees_count,
                ];
            });

        // Get kustodians (departments with is_kustodian = true)
        $kustodians = Department::where('is_kustodian', true)
            ->with('company:id,name')
            ->get()
            ->map(function ($dept) {
                return [
                    'id' => $dept->id,
                    'name' => $dept->name,
                    'company_name' => $dept->company->name,
                ];
            });

        return Inertia::render('Master/Perusahaan/Index', [
            'companies' => $companies,
            'kustodians' => $kustodians,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:50|unique:companies',
            'name' => 'required|string|max:255',
            'type' => 'required|in:main_contractor,sub_contractor',
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
            'pic_name' => 'nullable|string|max:255',
            'pic_phone' => 'nullable|string|max:20',
            'kustodian_ids' => 'nullable|array',
        ]);

        $company = Company::create($validated);

        // Attach kustodians for subcontractors
        if ($company->type === 'sub_contractor' && !empty($validated['kustodian_ids'])) {
            $company->kustodians()->attach($validated['kustodian_ids']);
        }

        return redirect()->route('master.perusahaan.index')
            ->with('success', 'Perusahaan berhasil ditambahkan');
    }

    public function update(Request $request, Company $company)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:50|unique:companies,code,' . $company->id,
            'name' => 'required|string|max:255',
            'type' => 'required|in:main_contractor,sub_contractor',
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:100',
            'pic_name' => 'nullable|string|max:255',
            'pic_phone' => 'nullable|string|max:20',
            'kustodian_ids' => 'nullable|array',
        ]);

        $company->update($validated);

        // Sync kustodians
        if ($company->type === 'sub_contractor') {
            $company->kustodians()->sync($validated['kustodian_ids'] ?? []);
        }

        return redirect()->route('master.perusahaan.index')
            ->with('success', 'Perusahaan berhasil diupdate');
    }

    public function destroy(Company $company)
    {
        $company->delete();

        return redirect()->route('master.perusahaan.index')
            ->with('success', 'Perusahaan berhasil dihapus');
    }
}
