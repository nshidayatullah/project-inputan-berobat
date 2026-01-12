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

export default function DepartemenIndex() {
    // Dummy data for Departemen
    const departments = [
        {
            id: 1,
            name: "Human Resources",
            code: "HR001",
            pic: "Andi Siregar",
            location: "Lantai 2",
        },
        {
            id: 2,
            name: "Finance & Accounting",
            code: "FA002",
            pic: "Rina Wati",
            location: "Lantai 3",
        },
        {
            id: 3,
            name: "Information Technology",
            code: "IT003",
            pic: "Budi Darmawan",
            location: "Lantai 4",
        },
        {
            id: 4,
            name: "Marketing",
            code: "MK004",
            pic: "Sinta Dewi",
            location: "Lantai 2",
        },
        {
            id: 5,
            name: "General Affairs",
            code: "GA005",
            pic: "Joko Susilo",
            location: "Lantai 1",
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Data Departemen
                </h2>
            }
        >
            <Head title="Data Departemen" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Daftar Departemen</CardTitle>
                                <CardDescription>
                                    Kelola data departemen di sini.
                                </CardDescription>
                            </div>
                            <Button>Tambah Departemen</Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">
                                            No.
                                        </TableHead>
                                        <TableHead>Nama Departemen</TableHead>
                                        <TableHead>Kode</TableHead>
                                        <TableHead>PIC</TableHead>
                                        <TableHead>Lokasi</TableHead>
                                        <TableHead className="text-right">
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {departments.map((dept, index) => (
                                        <TableRow key={dept.id}>
                                            <TableCell className="font-medium">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>{dept.name}</TableCell>
                                            <TableCell>{dept.code}</TableCell>
                                            <TableCell>{dept.pic}</TableCell>
                                            <TableCell>
                                                {dept.location}
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
