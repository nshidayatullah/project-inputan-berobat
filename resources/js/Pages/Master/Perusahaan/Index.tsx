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
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Pencil, Trash2, Plus, Building2, Users } from "lucide-react";

interface Company {
    id: number;
    code: string;
    name: string;
    type: string;
    type_label: string;
    address: string | null;
    phone: string | null;
    email: string | null;
    pic_name: string | null;
    is_active: boolean;
    employees_count: number;
}

interface Props {
    companies: Company[];
    kustodians: { id: number; name: string; company_name: string }[];
}

export default function PerusahaanIndex({
    companies = [],
    kustodians = [],
}: Props) {
    const mainContractor = companies.find((c) => c.type === "main_contractor");
    const subContractors = companies.filter((c) => c.type === "sub_contractor");

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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Total Perusahaan
                                        </p>
                                        <p className="text-2xl font-bold">
                                            {companies.length}
                                        </p>
                                    </div>
                                    <Building2 className="h-8 w-8 text-blue-500" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Sub Contractor
                                        </p>
                                        <p className="text-2xl font-bold">
                                            {subContractors.length}
                                        </p>
                                    </div>
                                    <Building2 className="h-8 w-8 text-green-500" />
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Total Karyawan
                                        </p>
                                        <p className="text-2xl font-bold">
                                            {companies.reduce(
                                                (sum, c) =>
                                                    sum + c.employees_count,
                                                0
                                            )}
                                        </p>
                                    </div>
                                    <Users className="h-8 w-8 text-purple-500" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Contractor */}
                    {mainContractor && (
                        <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-blue-500">
                                        Main Contractor
                                    </Badge>
                                    <CardTitle>{mainContractor.name}</CardTitle>
                                </div>
                                <CardDescription>
                                    Kode: {mainContractor.code} • PIC:{" "}
                                    {mainContractor.pic_name || "-"} • Karyawan:{" "}
                                    {mainContractor.employees_count}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    )}

                    {/* Sub Contractors */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Daftar Sub Contractor</CardTitle>
                                <CardDescription>
                                    Kelola data perusahaan sub contractor.
                                </CardDescription>
                            </div>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Tambah Perusahaan
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">
                                            No.
                                        </TableHead>
                                        <TableHead>Kode</TableHead>
                                        <TableHead>Nama Perusahaan</TableHead>
                                        <TableHead>PIC</TableHead>
                                        <TableHead>Karyawan</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">
                                            Aksi
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {subContractors.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={7}
                                                className="text-center py-8 text-muted-foreground"
                                            >
                                                Belum ada data sub contractor
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        subContractors.map((company, index) => (
                                            <TableRow key={company.id}>
                                                <TableCell>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell className="font-mono">
                                                    {company.code}
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {company.name}
                                                </TableCell>
                                                <TableCell>
                                                    {company.pic_name || "-"}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary">
                                                        {
                                                            company.employees_count
                                                        }{" "}
                                                        orang
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {company.is_active ? (
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
                                                            variant="ghost"
                                                            size="icon"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-destructive"
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
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
