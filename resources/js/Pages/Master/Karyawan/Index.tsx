import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
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
import { Button } from "@/Components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export default function KaryawanIndex() {
    // Dummy data for Karyawan
    const employees = [
        {
            id: 1,
            name: "Budi Santoso",
            gender: "L",
            nik_bib: "12345",
            nrp: "NRP-001",
            no_rm: "RM-1001",
            department: "IT",
            position: "Manager",
        },
        {
            id: 2,
            name: "Siti Aminah",
            gender: "P",
            nik_bib: "12346",
            nrp: "NRP-002",
            no_rm: "RM-1002",
            department: "Finance",
            position: "Supervisor",
        },
        {
            id: 3,
            name: "Rina Wati",
            gender: "P",
            nik_bib: "12347",
            nrp: "NRP-003",
            no_rm: "RM-1003",
            department: "HR",
            position: "Staff",
        },
        {
            id: 4,
            name: "Andi Siregar",
            gender: "L",
            nik_bib: "12348",
            nrp: "NRP-004",
            no_rm: "RM-1004",
            department: "Marketing",
            position: "Officer",
        },
        {
            id: 5,
            name: "Joko Susilo",
            gender: "L",
            nik_bib: "12349",
            nrp: "NRP-005",
            no_rm: "RM-1005",
            department: "GA",
            position: "Driver",
        },
    ];

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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Daftar Karyawan</CardTitle>
                                <CardDescription>
                                    Kelola data karyawan di sini.
                                </CardDescription>
                            </div>
                            <Button>Tambah Karyawan</Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">
                                            No.
                                        </TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Jenis Kelamin</TableHead>
                                        <TableHead>NIK BIB</TableHead>
                                        <TableHead>NRP</TableHead>
                                        <TableHead>No. RM</TableHead>
                                        <TableHead>Departemen</TableHead>
                                        <TableHead>Jabatan</TableHead>
                                        <TableHead className="text-right">
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {employees.map((emp, index) => (
                                        <TableRow key={emp.id}>
                                            <TableCell className="font-medium">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>{emp.name}</TableCell>
                                            <TableCell>
                                                {emp.gender === "L"
                                                    ? "Laki-laki"
                                                    : "Perempuan"}
                                            </TableCell>
                                            <TableCell>{emp.nik_bib}</TableCell>
                                            <TableCell>{emp.nrp}</TableCell>
                                            <TableCell>{emp.no_rm}</TableCell>
                                            <TableCell>
                                                {emp.department}
                                            </TableCell>
                                            <TableCell>
                                                {emp.position}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">
                                                            Edit
                                                        </span>
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">
                                                            Delete
                                                        </span>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
