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

export default function JabatanIndex() {
    // Dummy data for Jabatan
    const positions = [
        { id: 1, name: "Manager", code: "MGR", level: "Level 1" },
        { id: 2, name: "Supervisor", code: "SPV", level: "Level 2" },
        { id: 3, name: "Staff", code: "STF", level: "Level 3" },
        { id: 4, name: "Officer", code: "OFC", level: "Level 3" },
        { id: 5, name: "Intern", code: "INT", level: "Level 4" },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Data Jabatan
                </h2>
            }
        >
            <Head title="Data Jabatan" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Daftar Jabatan</CardTitle>
                                <CardDescription>
                                    Kelola data jabatan di sini.
                                </CardDescription>
                            </div>
                            <Button>Tambah Jabatan</Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">
                                            No.
                                        </TableHead>
                                        <TableHead>Nama Jabatan</TableHead>
                                        <TableHead>Kode</TableHead>
                                        <TableHead>Level</TableHead>
                                        <TableHead className="text-right">
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {positions.map((pos, index) => (
                                        <TableRow key={pos.id}>
                                            <TableCell className="font-medium">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>{pos.name}</TableCell>
                                            <TableCell>{pos.code}</TableCell>
                                            <TableCell>{pos.level}</TableCell>
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
