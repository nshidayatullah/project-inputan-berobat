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

export default function PerusahaanIndex() {
    // Dummy data for example
    const companies = [
        {
            id: 1,
            kustodian: "Kustodian A",
            name: "PT Sejahtera Abadi",
            code: "SA001",
            pic: "Budi Santoso",
        },
        {
            id: 2,
            kustodian: "Kustodian B",
            name: "CV Maju Jaya",
            code: "MJ002",
            pic: "Siti Aminah",
        },
        {
            id: 3,
            kustodian: "Kustodian A",
            name: "PT Teknologi Digital",
            code: "TD003",
            pic: "Rahmad Hidayat",
        },
        {
            id: 4,
            kustodian: "Kustodian C",
            name: "UD Sumber Makmur",
            code: "SM004",
            pic: "Dewi Lestari",
        },
        {
            id: 5,
            kustodian: "Kustodian B",
            name: "PT Bangun Negeri",
            code: "BN005",
            pic: "Eko Prasetyo",
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Data Perusahaan
                </h2>
            }
        >
            <Head title="Data Perusahaan" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Daftar Perusahaan</CardTitle>
                                <CardDescription>
                                    Kelola data perusahaan yang terdaftar.
                                </CardDescription>
                            </div>
                            <Button>Tambah Perusahaan</Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">
                                            No.
                                        </TableHead>
                                        <TableHead>Kustodian</TableHead>
                                        <TableHead>Nama Perusahaan</TableHead>
                                        <TableHead>Kode Perusahaan</TableHead>
                                        <TableHead>PIC</TableHead>
                                        <TableHead className="text-right">
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {companies.map((company, index) => (
                                        <TableRow key={company.id}>
                                            <TableCell className="font-medium">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                {company.kustodian}
                                            </TableCell>
                                            <TableCell>
                                                {company.name}
                                            </TableCell>
                                            <TableCell>
                                                {company.code}
                                            </TableCell>
                                            <TableCell>{company.pic}</TableCell>
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
