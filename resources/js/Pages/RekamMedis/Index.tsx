import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
    Activity,
    Users,
    Stethoscope,
    Calendar,
    Search,
    Filter,
    Plus,
    FileText,
    MoreHorizontal,
    Eye,
    Edit,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

export default function RekamMedisIndex() {
    // Dummy Data for Stats
    const stats = [
        {
            title: "Total Pasien",
            value: "2,350",
            icon: Users,
            description: "+180 bulan ini",
            color: "text-blue-600",
        },
        {
            title: "Kunjungan Hari Ini",
            value: "42",
            icon: Calendar,
            description: "8 jadwal MCU",
            color: "text-emerald-600",
        },
        {
            title: "Rawat Inap",
            value: "12",
            icon: Activity,
            description: "Kapasitas 85%",
            color: "text-rose-600",
        },
        {
            title: "Dokter Aktif",
            value: "8",
            icon: Stethoscope,
            description: "3 Spesialis di tempat",
            color: "text-indigo-600",
        },
    ];

    // Dummy Data for Patients
    const patients = [
        {
            id: 1,
            noRM: "RM-00234",
            name: "Ahmad Zulkarnain",
            nik_bib: "12345",
            nrp: "NRP-001",
            department: "IT",
            gender: "L",
            age: 45,
            diagnosis: "Hipertensi Grade 1",
            doctor: "dr. Setiawan Sp.PD",
            lastVisit: "2023-10-26",
            status: "Rawat Jalan",
            statusColor: "bg-emerald-100 text-emerald-800",
        },
        {
            id: 2,
            noRM: "RM-00235",
            name: "Budi Santoso",
            nik_bib: "12346",
            nrp: "NRP-002",
            department: "Finance",
            gender: "L",
            age: 32,
            diagnosis: "Febris H-3",
            doctor: "dr. Rina Amalia",
            lastVisit: "2023-10-26",
            status: "Rawat Inap",
            statusColor: "bg-blue-100 text-blue-800",
        },
        {
            id: 3,
            noRM: "RM-00236",
            name: "Siti Aminah",
            nik_bib: "12347",
            nrp: "NRP-003",
            department: "HR",
            gender: "P",
            age: 28,
            diagnosis: "Gastritis Akut",
            doctor: "dr. Setiawan Sp.PD",
            lastVisit: "2023-10-25",
            status: "Selesai",
            statusColor: "bg-gray-100 text-gray-800",
        },
        {
            id: 4,
            noRM: "RM-00237",
            name: "Eko Prasetyo",
            nik_bib: "12348",
            nrp: "NRP-004",
            department: "Marketing",
            gender: "L",
            age: 55,
            diagnosis: "Diabetes Melitus Tipe 2",
            doctor: "dr. Budi Gunawan Sp.PD",
            lastVisit: "2023-10-24",
            status: "Kontrol",
            statusColor: "bg-yellow-100 text-yellow-800",
        },
        {
            id: 5,
            noRM: "RM-00238",
            name: "Rini Wulandari",
            nik_bib: "12349",
            nrp: "NRP-005",
            department: "GA",
            gender: "P",
            age: 24,
            diagnosis: "ISPA",
            doctor: "dr. Rina Amalia",
            lastVisit: "2023-10-24",
            status: "Selesai",
            statusColor: "bg-gray-100 text-gray-800",
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Rekam Medis Elektronik
                </h2>
            }
        >
            <Head title="Rekam Medis" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {/* Stats Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <Card key={index}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {stat.title}
                                    </CardTitle>
                                    <stat.icon
                                        className={`h-4 w-4 ${stat.color}`}
                                    />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {stat.value}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {stat.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Main Content */}
                    <Card className="col-span-4">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Data Pasien</CardTitle>
                                    <CardDescription>
                                        Kelola seluruh data rekam medis pasien
                                        di sini.
                                    </CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="search"
                                            placeholder="Cari No RM, Nama, atau NIK..."
                                            className="pl-8 w-[300px]"
                                        />
                                    </div>
                                    <Button variant="outline">
                                        <Filter className="mr-2 h-4 w-4" />{" "}
                                        Filter
                                    </Button>
                                    <Button variant="outline">
                                        <FileText className="mr-2 h-4 w-4" />{" "}
                                        Export
                                    </Button>
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" />{" "}
                                        Registrasi Pasien
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No RM</TableHead>
                                        <TableHead className="min-w-[200px]">
                                            Pasien
                                        </TableHead>
                                        <TableHead>Departemen</TableHead>
                                        <TableHead>Jenis Kelamin</TableHead>
                                        <TableHead>Diagnosa Terakhir</TableHead>
                                        <TableHead>
                                            Dokter Penanggung Jawab
                                        </TableHead>
                                        <TableHead>Tgl Kunjungan</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">
                                            Aksi
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {patients.map((patient) => (
                                        <TableRow key={patient.id}>
                                            <TableCell className="font-medium font-mono">
                                                {patient.noRM}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9">
                                                        <AvatarImage
                                                            src={`https://ui-avatars.com/api/?name=${patient.name}&background=random`}
                                                            alt={patient.name}
                                                        />
                                                        <AvatarFallback>
                                                            {patient.name
                                                                .substring(0, 2)
                                                                .toUpperCase()}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold text-sm">
                                                            {patient.name}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                            <span>
                                                                {
                                                                    patient.nik_bib
                                                                }
                                                            </span>
                                                            <span className="text-[10px]">
                                                                •
                                                            </span>
                                                            <span>
                                                                {patient.nrp}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className="font-normal"
                                                >
                                                    {patient.department}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {patient.gender === "L"
                                                    ? "Laki-laki"
                                                    : "Perempuan"}
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium text-sm">
                                                    {patient.diagnosis}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Stethoscope className="h-3 w-3 text-muted-foreground" />
                                                    <span className="text-sm">
                                                        {patient.doctor}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {patient.lastVisit}
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${patient.statusColor}`}
                                                >
                                                    {patient.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <span className="sr-only">
                                                                Open menu
                                                            </span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>
                                                            Aksi
                                                        </DropdownMenuLabel>
                                                        <DropdownMenuItem>
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            Lihat Detail
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit Data
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>
                                                            <FileText className="mr-2 h-4 w-4" />
                                                            Cetak Resume
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
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
