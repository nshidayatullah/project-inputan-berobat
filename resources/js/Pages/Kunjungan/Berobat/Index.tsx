import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Search, User, Building2, ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface Employee {
    id: number;
    employee_number: string;
    nik: string | null;
    name: string;
    age: number;
    gender: string;
    gender_label: string;
    company_id: number;
    company_name: string;
    company_type: string;
    department_id: number | null;
    department_name: string | null;
    position_id: number | null;
    position_name: string | null;
    is_active: boolean;
}

interface Props {
    employees: Employee[];
    search: string;
}

// Debounce hook
function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default function BerobatIndex({ employees = [], search = "" }: Props) {
    const [searchTerm, setSearchTerm] = useState(search);
    const [isSearching, setIsSearching] = useState(false);
    const debouncedSearch = useDebounce(searchTerm, 300);

    // Auto search when typing
    useEffect(() => {
        if (debouncedSearch !== search) {
            if (debouncedSearch.length >= 2 || debouncedSearch.length === 0) {
                setIsSearching(true);
                router.get(
                    route("kunjungan.berobat.index"),
                    { search: debouncedSearch },
                    {
                        preserveState: true,
                        replace: true,
                        onFinish: () => setIsSearching(false),
                    }
                );
            }
        }
    }, [debouncedSearch]);

    const handleSelectEmployee = (employee: Employee) => {
        router.get(route("kunjungan.berobat.rekam-medis"), {
            employee_id: employee.id,
        });
    };

    const getCompanyTypeBadge = (type: string) => {
        return type === "main_contractor" ? (
            <Badge className="bg-blue-500 text-xs">PPA</Badge>
        ) : (
            <Badge variant="outline" className="text-xs">
                Sub
            </Badge>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Kunjungan Berobat
                </h2>
            }
        >
            <Head title="Kunjungan Berobat" />

            <div className="py-6">
                <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardContent className="pt-6 space-y-6">
                            {/* Centered Search Field */}
                            <div className="flex flex-col items-center justify-center py-8">
                                <div className="w-full max-w-xl">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            placeholder="Ketik Nama / NIK BIB / NRP PPA..."
                                            value={searchTerm}
                                            onChange={(e) =>
                                                setSearchTerm(e.target.value)
                                            }
                                            className="h-14 text-lg pl-12 pr-12"
                                            autoFocus
                                        />
                                        {isSearching && (
                                            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-muted-foreground" />
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground text-center mt-3">
                                        Ketik minimal 2 karakter untuk mencari
                                    </p>
                                </div>
                            </div>

                            {/* Results Table */}
                            {searchTerm.length >= 2 && (
                                <div className="border rounded-lg">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>NRP/NIK</TableHead>
                                                <TableHead>
                                                    Nama Karyawan
                                                </TableHead>
                                                <TableHead>
                                                    Perusahaan
                                                </TableHead>
                                                <TableHead>
                                                    Departemen
                                                </TableHead>
                                                <TableHead>Jabatan</TableHead>
                                                <TableHead>Usia</TableHead>
                                                <TableHead className="text-right">
                                                    Aksi
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {isSearching ? (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={7}
                                                        className="text-center py-12"
                                                    >
                                                        <Loader2 className="h-8 w-8 mx-auto mb-2 animate-spin text-muted-foreground" />
                                                        <p className="text-muted-foreground">
                                                            Mencari...
                                                        </p>
                                                    </TableCell>
                                                </TableRow>
                                            ) : employees.length === 0 ? (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={7}
                                                        className="text-center py-12"
                                                    >
                                                        <User className="h-12 w-12 mx-auto mb-3 opacity-30" />
                                                        <p className="text-muted-foreground mb-4">
                                                            Tidak ditemukan
                                                            karyawan dengan kata
                                                            kunci "{searchTerm}"
                                                        </p>
                                                        <Button
                                                            variant="outline"
                                                            onClick={() =>
                                                                router.get(
                                                                    route(
                                                                        "master.karyawan.index"
                                                                    ),
                                                                    {
                                                                        action: "create",
                                                                        name: searchTerm,
                                                                    }
                                                                )
                                                            }
                                                        >
                                                            <User className="h-4 w-4 mr-2" />
                                                            Tambah Karyawan Baru
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                employees.map((employee) => (
                                                    <TableRow
                                                        key={employee.id}
                                                        className="cursor-pointer hover:bg-muted/50"
                                                        onClick={() =>
                                                            handleSelectEmployee(
                                                                employee
                                                            )
                                                        }
                                                    >
                                                        <TableCell>
                                                            <div className="font-mono text-sm">
                                                                {
                                                                    employee.employee_number
                                                                }
                                                            </div>
                                                            {employee.nik && (
                                                                <div className="text-xs text-muted-foreground">
                                                                    NIK:{" "}
                                                                    {
                                                                        employee.nik
                                                                    }
                                                                </div>
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="font-medium">
                                                                {employee.name}
                                                            </div>
                                                            <div className="text-xs text-muted-foreground">
                                                                {
                                                                    employee.gender_label
                                                                }
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                                                <div>
                                                                    <div>
                                                                        {
                                                                            employee.company_name
                                                                        }
                                                                    </div>
                                                                    {getCompanyTypeBadge(
                                                                        employee.company_type
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell>
                                                            {employee.department_name ||
                                                                "-"}
                                                        </TableCell>
                                                        <TableCell>
                                                            {employee.position_name ||
                                                                "-"}
                                                        </TableCell>
                                                        <TableCell>
                                                            {employee.age} thn
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    handleSelectEmployee(
                                                                        employee
                                                                    );
                                                                }}
                                                            >
                                                                Rekam Medis
                                                                <ArrowRight className="h-4 w-4 ml-1" />
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>

                                    {!isSearching && employees.length > 0 && (
                                        <div className="p-3 border-t bg-muted/30 text-sm text-muted-foreground text-center">
                                            Ditemukan {employees.length}{" "}
                                            karyawan • Klik untuk melihat rekam
                                            medis
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Empty State */}
                            {searchTerm.length < 2 && (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Search className="h-16 w-16 mx-auto mb-4 opacity-20" />
                                    <p className="text-lg">
                                        Cari karyawan untuk menambahkan
                                        kunjungan berobat
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
