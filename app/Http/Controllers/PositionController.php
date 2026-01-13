<?php

namespace App\Http\Controllers;

use App\Models\Position;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PositionController extends Controller
{
    public function index()
    {
        $positions = Position::with(['company:id,name,type'])
            ->withCount('employees')
            ->orderBy('company_id')
            ->orderBy('name')
            ->get()
            ->map(function ($pos) {
                return [
                    'id' => $pos->id,
                    'code' => $pos->code,
                    'name' => $pos->name,
                    'level' => $pos->level,
                    'company_id' => $pos->company_id,
                    'company_name' => $pos->company->name,
                    'company_type' => $pos->company->type,
                    'is_active' => $pos->is_active,
                    'employees_count' => $pos->employees_count,
                ];
            });

        $companies = Company::where('is_active', true)
            ->select('id', 'name', 'type')
            ->orderBy('name')
            ->get();

        return Inertia::render('Master/Jabatan/Index', [
            'positions' => $positions,
            'companies' => $companies,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_id' => 'required|exists:companies,id',
            'code' => 'required|string|max:50',
            'name' => 'required|string|max:255',
            'level' => 'nullable|string|max:50',
        ]);

        Position::create($validated);

        return redirect()->route('master.jabatan.index')
            ->with('success', 'Jabatan berhasil ditambahkan');
    }

    public function update(Request $request, Position $position)
    {
        $validated = $request->validate([
            'company_id' => 'required|exists:companies,id',
            'code' => 'required|string|max:50',
            'name' => 'required|string|max:255',
            'level' => 'nullable|string|max:50',
        ]);

        $position->update($validated);

        return redirect()->route('master.jabatan.index')
            ->with('success', 'Jabatan berhasil diupdate');
    }

    public function destroy(Position $position)
    {
        $position->delete();

        return redirect()->route('master.jabatan.index')
            ->with('success', 'Jabatan berhasil dihapus');
    }
}
