import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/Components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Badge } from "@/Components/ui/badge";
import {
    Pencil,
    Trash2,
    Plus,
    Search,
    Users,
    Building2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { useState } from "react";

interface Employee {
    id: number;
    employee_number: string;
    nik_bib: string | null;
    nik: string | null;
    name: string;
    date_of_birth: string | null;
    age: number;
    gender: string;
    gender_label: string;
    phone: string | null;
    email: string | null;
    company_id: number;
    company_name: string;
    company_type: string;
    department_id: number | null;
    department_name: string | null;
    position_id: number | null;
    position_name: string | null;
    is_active: boolean;
}

interface Company {
    id: number;
    name: string;
    type: string;
}

interface Props {
    employees: {
        data: Employee[];
        current_page: number;
        last_page: number;
        total: number;
    };
    companies: Company[];
    filters: {
        company_id?: string;
        search?: string;
    };
}

export default function KaryawanIndex({
    employees,
    companies = [],
    filters = {},
}: Props) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(
        null
    );
    const [search, setSearch] = useState(filters.search || "");

    const handleCreate = () => {
        router.get(route("master.karyawan.create"));
    };

    const handleEdit = (employee: Employee) => {
        router.get(route("master.karyawan.edit", employee.id));
    };

    const handleDelete = (employee: Employee) => {
        setDeletingEmployee(employee);
        setShowDeleteDialog(true);
    };

    const confirmDelete = () => {
        if (deletingEmployee) {
            router.delete(
                route("master.karyawan.destroy", deletingEmployee.id),
                {
                    onSuccess: () => {
                        setShowDeleteDialog(false);
                        setDeletingEmployee(null);
                    },
                }
            );
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route("master.karyawan.index"),
            { search },
            { preserveState: true }
        );
    };

    const handleFilterCompany = (companyId: string) => {
        router.get(
            route("master.karyawan.index"),
            {
                ...filters,
                company_id: companyId === "all" ? "" : companyId,
            },
            { preserveState: true }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Data Karyawan
                </h2>
            }
        >
            <Head title="Data Karyawan" />

            <div className="py-6">
                <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 space-y-6">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Total Karyawan
                                        </p>
                                        <p className="text-2xl font-bold">
                                            {employees?.total || 0}
                                        </p>
                                    </div>
                                    <Users className="h-8 w-8 text-blue-500" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Perusahaan
                                        </p>
                                        <p className="text-2xl font-bold">
                                            {companies.length}
                                        </p>
                                    </div>
                                    <Building2 className="h-8 w-8 text-green-500" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Table */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Daftar Karyawan</CardTitle>
                                <CardDescription>
                                    Kelola data karyawan di sini.
                                </CardDescription>
                            </div>
                            <div className="flex gap-2">
                                <form
                                    onSubmit={handleSearch}
                                    className="flex gap-2"
                                >
                                    <Input
                                        placeholder="Cari nama/NRP..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="w-48"
                                    />
                                    <Button
                                        type="submit"
                                        variant="outline"
                                        size="icon"
                                    >
                                        <Search className="h-4 w-4" />
                                    </Button>
                                </form>
                                <Select
                                    value={filters.company_id || "all"}
                                    onValueChange={handleFilterCompany}
                                >
                                    <SelectTrigger className="w-48">
                                        <SelectValue placeholder="Filter Perusahaan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            Semua Perusahaan
                                        </SelectItem>
                                        {companies.map((c) => (
                                            <SelectItem
                                                key={c.id}
                                                value={String(c.id)}
                                            >
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button onClick={handleCreate}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Tambah Karyawan
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">
                                            No.
                                        </TableHead>
                                        <TableHead>NRP/NIK</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Perusahaan</TableHead>
                                        <TableHead>Departemen</TableHead>
                                        <TableHead>Jabatan</TableHead>
                                        <TableHead>Usia</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">
                                            Aksi
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {!employees?.data?.length ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={9}
                                                className="text-center py-8 text-muted-foreground"
                                            >
                                                Belum ada data karyawan
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        employees.data.map((emp, index) => (
                                            <TableRow key={emp.id}>
                                                <TableCell className="font-medium">
                                                    {(employees.current_page -
                                                        1) *
                                                        20 +
                                                        index +
                                                        1}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-mono text-sm">
                                                        {emp.employee_number}
                                                    </div>
                                                    {emp.nik_bib && (
                                                        <div className="text-xs text-blue-600">
                                                            BIB: {emp.nik_bib}
                                                        </div>
                                                    )}
                                                    {emp.nik && (
                                                        <div className="text-xs text-muted-foreground">
                                                            NIK: {emp.nik}
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-medium">
                                                        {emp.name}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {emp.gender_label}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div>
                                                        {emp.company_name}
                                                    </div>
                                                    <Badge
                                                        variant={
                                                            emp.company_type ===
                                                            "main_contractor"
                                                                ? "default"
                                                                : "outline"
                                                        }
                                                        className="text-xs"
                                                    >
                                                        {emp.company_type ===
                                                        "main_contractor"
                                                            ? "PPA"
                                                            : "Sub"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {emp.department_name || "-"}
                                                </TableCell>
                                                <TableCell>
                                                    {emp.position_name || "-"}
                                                </TableCell>
                                                <TableCell>
                                                    {emp.age} thn
                                                </TableCell>
                                                <TableCell>
                                                    {emp.is_active ? (
                                                        <Badge className="bg-green-500">
                                                            Aktif
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="secondary">
                                                            Nonaktif
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            onClick={() =>
                                                                handleEdit(emp)
                                                            }
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    emp
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>

                            {/* Pagination */}
                            {employees?.last_page > 1 && (
                                <div className="flex items-center justify-between mt-4">
                                    <p className="text-sm text-muted-foreground">
                                        Halaman {employees.current_page} dari{" "}
                                        {employees.last_page} • Total{" "}
                                        {employees.total} data
                                    </p>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={
                                                employees.current_page === 1
                                            }
                                            onClick={() =>
                                                router.get(
                                                    route(
                                                        "master.karyawan.index"
                                                    ),
                                                    {
                                                        ...filters,
                                                        page:
                                                            employees.current_page -
                                                            1,
                                                    }
                                                )
                                            }
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={
                                                employees.current_page ===
                                                employees.last_page
                                            }
                                            onClick={() =>
                                                router.get(
                                                    route(
                                                        "master.karyawan.index"
                                                    ),
                                                    {
                                                        ...filters,
                                                        page:
                                                            employees.current_page +
                                                            1,
                                                    }
                                                )
                                            }
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Delete Confirmation */}
            <AlertDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Karyawan?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus karyawan{" "}
                            <strong>{deletingEmployee?.name}</strong>? Tindakan
                            ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AuthenticatedLayout>
    );
}
