import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/Components/ui/card";
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
import {
    Search,
    Plus,
    Eye,
    Pencil,
    Trash2,
    Calendar,
    Clock,
    User,
    Stethoscope,
    Pill,
    Activity,
    Filter,
    ChevronLeft,
    ChevronRight,
    FileText,
    X,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Input as InputField } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

export default function BerobatIndex() {
    // Dummy Data
    const historyBerobat = [
        {
            id: 1,
            employee: "Budi Santoso",
            company: "PT Sejahtera Abadi",
            department: "IT",
            position: "Staff",
            age: 30,
            medicines: [
                { name: "Paracetamol", qty: 2 },
                { name: "Vitamin C", qty: 1 },
            ],
            complaint: "Demam, Pusing, Batuk",
            diagnosis: "Febris + ISPA",
            workDay: "Senin",
            actionStatus: "Lanjut Kerja",
            bp: "120/80",
            pulse: 80,
            rr: 20,
            temp: 38.5,
            spo2: 98,
            labTests: [
                {
                    type: "Gula Darah Sewaktu",
                    result: "110 mg/dL",
                    normal: true,
                },
            ],
            pic: "Dr. Setiawan",
            time: "09:00",
            status: "Selesai",
            date: "2023-10-25",
        },
        {
            id: 2,
            employee: "Siti Aminah",
            company: "CV Maju Jaya",
            department: "Finance",
            position: "SPV",
            age: 28,
            medicines: [
                { name: "Amoxicillin", qty: 3 },
                { name: "Antasida", qty: 1 },
            ],
            complaint: "Sakit tenggorokan, Nyeri ulu hati",
            diagnosis: "Faringitis + Gastritis",
            workDay: "Selasa",
            actionStatus: "Pulang",
            bp: "110/70",
            pulse: 88,
            rr: 18,
            temp: 37.2,
            spo2: 99,
            labTests: [
                { type: "Hemoglobin", result: "12.5 g/dL", normal: true },
                { type: "Cholesterol", result: "220 mg/dL", normal: false },
            ],
            pic: "Perawat Rina",
            time: "10:30",
            status: "Selesai",
            date: "2023-10-24",
        },
        {
            id: 3,
            employee: "Andi Siregar",
            company: "PT Sejahtera Abadi",
            department: "HR",
            position: "Manager",
            age: 35,
            medicines: [{ name: "Lansoprazole", qty: 2 }],
            complaint: "Nyeri dada, Sesak napas",
            diagnosis: "GERD",
            workDay: "Rabu",
            actionStatus: "Dirujuk",
            bp: "140/90",
            pulse: 95,
            rr: 22,
            temp: 36.8,
            spo2: 96,
            labTests: [
                { type: "Gula Darah Puasa", result: "105 mg/dL", normal: true },
                { type: "Asam Urat", result: "7.8 mg/dL", normal: false },
                { type: "Trigliserida", result: "180 mg/dL", normal: false },
            ],
            pic: "Dr. Setiawan",
            time: "14:00",
            status: "Selesai",
            date: "2023-10-23",
        },
        {
            id: 4,
            employee: "Budi Santoso",
            company: "PT Sejahtera Abadi",
            department: "IT",
            position: "Staff",
            age: 30,
            medicines: [{ name: "Ambroxol", qty: 2 }],
            complaint: "Batuk berdahak",
            diagnosis: "Bronkitis Akut",
            workDay: "Kamis",
            actionStatus: "Lanjut Kerja",
            bp: "125/82",
            pulse: 78,
            rr: 19,
            temp: 37.0,
            spo2: 97,
            labTests: [],
            pic: "Dr. Setiawan",
            time: "08:30",
            status: "Selesai",
            date: "2023-10-20",
        },
        {
            id: 5,
            employee: "Budi Santoso",
            company: "PT Sejahtera Abadi",
            department: "IT",
            position: "Staff",
            age: 30,
            medicines: [{ name: "Cetirizine", qty: 1 }],
            complaint: "Gatal-gatal, Alergi",
            diagnosis: "Dermatitis Alergi",
            workDay: "Rabu",
            actionStatus: "Pulang",
            bp: "118/78",
            pulse: 76,
            rr: 18,
            temp: 36.6,
            spo2: 99,
            labTests: [
                { type: "Hemoglobin", result: "14.5 g/dL", normal: true },
            ],
            pic: "Perawat Rina",
            time: "11:00",
            status: "Selesai",
            date: "2023-10-15",
        },
    ];

    const getStatusBadge = (status: string) => {
        const variants: {
            [key: string]: "default" | "secondary" | "destructive" | "outline";
        } = {
            Selesai: "default",
            Proses: "secondary",
            Pending: "outline",
        };
        return (
            <Badge
                variant={variants[status] || "default"}
                className="font-normal"
            >
                {status}
            </Badge>
        );
    };

    const getActionStatusBadge = (actionStatus: string) => {
        const config: {
            [key: string]: {
                variant: "default" | "secondary" | "destructive" | "outline";
                className: string;
            };
        } = {
            "Lanjut Kerja": {
                variant: "default",
                className: "bg-green-600 hover:bg-green-700",
            },
            Pulang: {
                variant: "secondary",
                className: "bg-yellow-600 hover:bg-yellow-700 text-white",
            },
            Dirujuk: { variant: "destructive", className: "" },
        };
        const statusConfig = config[actionStatus] || {
            variant: "outline" as const,
            className: "",
        };
        return (
            <Badge
                variant={statusConfig.variant}
                className={`font-normal ${statusConfig.className}`}
            >
                {actionStatus}
            </Badge>
        );
    };

    const handleRowClick = (employeeName: string) => {
        router.visit(
            route("kunjungan.berobat.rekam-medis", { employee: employeeName })
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

            <div className="py-8">
                <div className="mx-auto w-full px-6 lg:px-12">
                    <Card className="shadow-sm">
                        <CardHeader className="space-y-2 pb-6 px-8 pt-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-2xl">
                                        Kunjungan Berobat
                                    </CardTitle>
                                    <CardDescription className="mt-2">
                                        Kelola dan pantau riwayat kunjungan
                                        berobat karyawan
                                    </CardDescription>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="gap-2">
                                            <Plus className="h-4 w-4" />
                                            Tambah Kunjungan
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[700px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Input Kunjungan Berobat
                                            </DialogTitle>
                                            <DialogDescription>
                                                Masukkan data kunjungan baru
                                                disini. Klik simpan setelah
                                                selesai.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="date"
                                                    className="text-right"
                                                >
                                                    Tanggal
                                                </Label>
                                                <InputField
                                                    id="date"
                                                    type="date"
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="time"
                                                    className="text-right"
                                                >
                                                    Waktu
                                                </Label>
                                                <InputField
                                                    id="time"
                                                    type="time"
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="workDay"
                                                    className="text-right"
                                                >
                                                    Hari Kerja
                                                </Label>
                                                <Select>
                                                    <SelectTrigger className="col-span-3">
                                                        <SelectValue placeholder="Pilih Hari" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="senin">
                                                            Senin
                                                        </SelectItem>
                                                        <SelectItem value="selasa">
                                                            Selasa
                                                        </SelectItem>
                                                        <SelectItem value="rabu">
                                                            Rabu
                                                        </SelectItem>
                                                        <SelectItem value="kamis">
                                                            Kamis
                                                        </SelectItem>
                                                        <SelectItem value="jumat">
                                                            Jumat
                                                        </SelectItem>
                                                        <SelectItem value="sabtu">
                                                            Sabtu
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="employee"
                                                    className="text-right"
                                                >
                                                    Nama Karyawan
                                                </Label>
                                                <Select>
                                                    <SelectTrigger className="col-span-3">
                                                        <SelectValue placeholder="Pilih Karyawan" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="1">
                                                            Budi Santoso
                                                        </SelectItem>
                                                        <SelectItem value="2">
                                                            Siti Aminah
                                                        </SelectItem>
                                                        <SelectItem value="3">
                                                            Andi Siregar
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="complaint"
                                                    className="text-right"
                                                >
                                                    Keluhan
                                                </Label>
                                                <Textarea
                                                    id="complaint"
                                                    placeholder="Keluhan utama..."
                                                    className="col-span-3"
                                                    rows={3}
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="diagnosis"
                                                    className="text-right"
                                                >
                                                    Diagnosa
                                                </Label>
                                                <InputField
                                                    id="diagnosis"
                                                    placeholder="Diagnosa medis..."
                                                    className="col-span-3"
                                                />
                                            </div>

                                            {/* Tanda Vital Section */}
                                            <div className="col-span-4 border-t pt-4">
                                                <h4 className="font-medium mb-3">
                                                    Tanda Vital
                                                </h4>
                                                <div className="space-y-3">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label className="text-right">
                                                            Tekanan Darah
                                                        </Label>
                                                        <InputField
                                                            placeholder="mmHg (contoh: 120/80)"
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label className="text-right">
                                                            Nadi
                                                        </Label>
                                                        <InputField
                                                            type="number"
                                                            placeholder="x/menit"
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label className="text-right">
                                                            Respirasi (RR)
                                                        </Label>
                                                        <InputField
                                                            type="number"
                                                            placeholder="x/menit"
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label className="text-right">
                                                            Suhu
                                                        </Label>
                                                        <InputField
                                                            type="number"
                                                            step="0.1"
                                                            placeholder="°C"
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Terapi & Lab Section */}
                                            <div className="col-span-4 border-t pt-4">
                                                <h4 className="font-medium mb-3">
                                                    Terapi & Laboratorium
                                                </h4>
                                                <div className="space-y-3">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label
                                                            htmlFor="medicine"
                                                            className="text-right"
                                                        >
                                                            Obat / Terapi
                                                        </Label>
                                                        <InputField
                                                            id="medicine"
                                                            placeholder="Nama obat..."
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label
                                                            htmlFor="medicineQty"
                                                            className="text-right"
                                                        >
                                                            Jumlah Obat
                                                        </Label>
                                                        <InputField
                                                            id="medicineQty"
                                                            type="number"
                                                            placeholder="Jumlah"
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label
                                                            htmlFor="labResult"
                                                            className="text-right"
                                                        >
                                                            Hasil Lab
                                                        </Label>
                                                        <InputField
                                                            id="labResult"
                                                            placeholder="Hasil pemeriksaan lab (opsional)"
                                                            className="col-span-3"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Info Tambahan */}
                                            <div className="col-span-4 border-t pt-4">
                                                <div className="space-y-3">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label
                                                            htmlFor="pic"
                                                            className="text-right"
                                                        >
                                                            Petugas
                                                        </Label>
                                                        <Select>
                                                            <SelectTrigger className="col-span-3">
                                                                <SelectValue placeholder="Pilih Petugas" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="dr-setiawan">
                                                                    Dr. Setiawan
                                                                </SelectItem>
                                                                <SelectItem value="perawat-rina">
                                                                    Perawat Rina
                                                                </SelectItem>
                                                                <SelectItem value="perawat-dewi">
                                                                    Perawat Dewi
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label
                                                            htmlFor="notes"
                                                            className="text-right"
                                                        >
                                                            Catatan
                                                        </Label>
                                                        <Textarea
                                                            id="notes"
                                                            placeholder="Catatan tambahan (contoh: istirahat 2 hari)..."
                                                            className="col-span-3"
                                                            rows={3}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit">
                                                Simpan Data
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 px-8 pb-8">
                            {/* Filters and Search */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Cari nama karyawan, diagnosa, atau keluhan..."
                                        className="pl-9"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <Select defaultValue="all">
                                        <SelectTrigger className="w-[140px]">
                                            <Filter className="mr-2 h-4 w-4" />
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                Semua Status
                                            </SelectItem>
                                            <SelectItem value="selesai">
                                                Selesai
                                            </SelectItem>
                                            <SelectItem value="proses">
                                                Proses
                                            </SelectItem>
                                            <SelectItem value="pending">
                                                Pending
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select defaultValue="newest">
                                        <SelectTrigger className="w-[140px]">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            <SelectValue placeholder="Urutkan" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="newest">
                                                Terbaru
                                            </SelectItem>
                                            <SelectItem value="oldest">
                                                Terlama
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Professional Table */}
                            <div className="rounded-lg border bg-card overflow-hidden">
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-muted/50 hover:bg-muted/50">
                                                <TableHead className="w-14 font-semibold py-4">
                                                    No
                                                </TableHead>
                                                <TableHead className="min-w-[250px] font-semibold py-4">
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4" />
                                                        Data Pasien
                                                    </div>
                                                </TableHead>
                                                <TableHead className="min-w-[220px] font-semibold py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4" />
                                                        Info Kunjungan
                                                    </div>
                                                </TableHead>
                                                <TableHead className="w-[100px] text-center font-semibold py-4">
                                                    Aksi
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {historyBerobat.length > 0 ? (
                                                historyBerobat.map(
                                                    (item, index) => (
                                                        <TableRow
                                                            key={item.id}
                                                            onClick={() =>
                                                                handleRowClick(
                                                                    item.employee
                                                                )
                                                            }
                                                            className="hover:bg-muted/30 transition-colors border-b cursor-pointer"
                                                        >
                                                            <TableCell className="font-medium text-muted-foreground py-6">
                                                                {index + 1}
                                                            </TableCell>
                                                            <TableCell className="py-6">
                                                                <div className="space-y-2">
                                                                    <div className="font-semibold text-foreground">
                                                                        {
                                                                            item.employee
                                                                        }
                                                                    </div>
                                                                    <div className="flex items-center gap-2 text-xs">
                                                                        <Badge
                                                                            variant="outline"
                                                                            className="font-normal"
                                                                        >
                                                                            {
                                                                                item.age
                                                                            }{" "}
                                                                            Tahun
                                                                        </Badge>
                                                                        <span className="text-muted-foreground">
                                                                            •
                                                                        </span>
                                                                        <span className="text-muted-foreground">
                                                                            {
                                                                                item.position
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground">
                                                                        {
                                                                            item.department
                                                                        }
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground font-medium">
                                                                        {
                                                                            item.company
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="py-6">
                                                                <div className="space-y-2">
                                                                    <div className="flex items-center gap-2 text-xs">
                                                                        <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                                                        <span className="font-medium">
                                                                            {
                                                                                item.date
                                                                            }
                                                                        </span>
                                                                        <span className="text-muted-foreground">
                                                                            •
                                                                        </span>
                                                                        <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                                                        <span>
                                                                            {
                                                                                item.time
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 text-xs">
                                                                        <span className="text-muted-foreground">
                                                                            Hari
                                                                            Kerja:
                                                                        </span>
                                                                        <Badge
                                                                            variant="outline"
                                                                            className="font-normal text-xs"
                                                                        >
                                                                            {
                                                                                item.workDay
                                                                            }
                                                                        </Badge>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 flex-wrap">
                                                                        {getStatusBadge(
                                                                            item.status
                                                                        )}
                                                                        {getActionStatusBadge(
                                                                            item.actionStatus
                                                                        )}
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                                                                        <User className="h-3 w-3" />
                                                                        <span>
                                                                            {
                                                                                item.pic
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="text-center py-6">
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger
                                                                        asChild
                                                                    >
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                e.stopPropagation()
                                                                            }
                                                                        >
                                                                            <Eye className="h-4 w-4" />
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent align="end">
                                                                        <DropdownMenuLabel>
                                                                            Aksi
                                                                        </DropdownMenuLabel>
                                                                        <DropdownMenuSeparator />
                                                                        <DropdownMenuItem
                                                                            onClick={(
                                                                                e
                                                                            ) => {
                                                                                e.stopPropagation();
                                                                                handleRowClick(
                                                                                    item.employee
                                                                                );
                                                                            }}
                                                                        >
                                                                            <FileText className="mr-2 h-4 w-4" />
                                                                            Lihat
                                                                            Detail
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                e.stopPropagation()
                                                                            }
                                                                        >
                                                                            <Pencil className="mr-2 h-4 w-4" />
                                                                            Edit
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                e.stopPropagation()
                                                                            }
                                                                            className="text-destructive focus:text-destructive"
                                                                        >
                                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                                            Hapus
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )
                                            ) : (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={4}
                                                        className="h-32 text-center"
                                                    >
                                                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                                                            <Stethoscope className="h-12 w-12 mb-2 opacity-20" />
                                                            <p className="text-sm font-medium">
                                                                Belum ada data
                                                                kunjungan
                                                            </p>
                                                            <p className="text-xs">
                                                                Tambahkan
                                                                kunjungan baru
                                                                untuk memulai
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between px-2 py-3">
                                <div className="text-sm text-muted-foreground">
                                    Menampilkan{" "}
                                    <span className="font-medium">
                                        1-{historyBerobat.length}
                                    </span>{" "}
                                    dari{" "}
                                    <span className="font-medium">
                                        {historyBerobat.length}
                                    </span>{" "}
                                    data
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled
                                        className="gap-1"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Sebelumnya
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled
                                        className="gap-1"
                                    >
                                        Selanjutnya
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
