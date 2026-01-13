import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link, router } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Badge } from "@/Components/ui/badge";
import {
    ChevronLeft,
    User,
    Stethoscope,
    Pill,
    Activity,
    Save,
    Plus,
    Trash2,
} from "lucide-react";
import { useState, useEffect } from "react";

interface Medicine {
    id: number;
    name: string;
    unit: string;
}

interface DiagnosisItem {
    id: number;
    icd10_code: string;
    name_id: string;
}

interface Employee {
    id: number;
    employee_number: string;
    name: string;
    age: number;
    gender: string;
    company_name: string;
    department_name: string | null;
    position_name: string | null;
}

interface CreateProps {
    employee: Employee | null;
    medicines: Medicine[];
    diagnoses: DiagnosisItem[];
}

interface MedicineEntry {
    medicine_id: string;
    quantity: number;
    dosage: string;
    frequency: string;
}

export default function BerobatCreate({
    employee,
    medicines,
    diagnoses,
}: CreateProps) {
    const [medicineList, setMedicineList] = useState<MedicineEntry[]>([]);

    const { data, setData, post, processing, errors } = useForm({
        employee_id: employee?.id || "",
        visit_date: new Date().toISOString().split("T")[0],
        visit_time: new Date().toTimeString().slice(0, 5),
        visit_type: "berobat",
        complaint: "",
        diagnosis_id: "",
        plan: "",
        bp_systolic: "",
        bp_diastolic: "",
        pulse: "",
        rr: "",
        temp: "",
        spo2: "",
        action_status: "",
        medicines: [] as MedicineEntry[],
    });

    const addMedicine = () => {
        setMedicineList([
            ...medicineList,
            { medicine_id: "", quantity: 1, dosage: "", frequency: "" },
        ]);
    };

    const removeMedicine = (index: number) => {
        const updated = medicineList.filter((_, i) => i !== index);
        setMedicineList(updated);
    };

    const updateMedicine = (
        index: number,
        field: keyof MedicineEntry,
        value: string | number
    ) => {
        const updated = [...medicineList];
        updated[index] = { ...updated[index], [field]: value };
        setMedicineList(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Set medicines to data before submit
        setData(
            "medicines",
            medicineList.filter((m) => m.medicine_id)
        );
        post(route("kunjungan.berobat.store"));
    };

    if (!employee) {
        return (
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Tambah Kunjungan Berobat
                    </h2>
                }
            >
                <Head title="Tambah Kunjungan" />
                <div className="py-8">
                    <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                        <Card>
                            <CardContent className="text-center py-16">
                                <User className="h-16 w-16 mx-auto mb-4 opacity-20" />
                                <h3 className="text-lg font-semibold mb-2">
                                    Pilih Pasien Terlebih Dahulu
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    Silakan pilih pasien dari halaman Kunjungan
                                    Berobat.
                                </p>
                                <Button
                                    onClick={() =>
                                        router.visit(
                                            route("kunjungan.berobat.index")
                                        )
                                    }
                                >
                                    Kembali ke Daftar Kunjungan
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href={route("kunjungan.berobat.index")}>
                        <Button variant="ghost" size="icon">
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Tambah Kunjungan Berobat
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Kunjungan" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* LEFT COLUMN - Patient Info & SOAP */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Patient Info Card */}
                                <Card>
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center gap-2">
                                            <User className="h-5 w-5 text-blue-500" />
                                            <CardTitle>Data Pasien</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div>
                                                <div className="text-xs text-muted-foreground">
                                                    Nama
                                                </div>
                                                <div className="font-semibold">
                                                    {employee.name}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-muted-foreground">
                                                    NRP
                                                </div>
                                                <div className="font-mono">
                                                    {employee.employee_number}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-muted-foreground">
                                                    Usia
                                                </div>
                                                <div>{employee.age} Tahun</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-muted-foreground">
                                                    Perusahaan
                                                </div>
                                                <div>
                                                    {employee.company_name}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* SOAP Card */}
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center gap-2">
                                            <Stethoscope className="h-5 w-5 text-green-500" />
                                            <CardTitle>
                                                Rekam Medis (SOAP)
                                            </CardTitle>
                                        </div>
                                        <CardDescription>
                                            Isi data pemeriksaan pasien.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {/* Subjective */}
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="complaint"
                                                className="flex items-center gap-2"
                                            >
                                                <Badge className="bg-blue-500">
                                                    S
                                                </Badge>
                                                Keluhan (Subjective)
                                            </Label>
                                            <Textarea
                                                id="complaint"
                                                value={data.complaint}
                                                onChange={(e) =>
                                                    setData(
                                                        "complaint",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Keluhan pasien..."
                                                className="min-h-[80px]"
                                            />
                                        </div>

                                        {/* Objective - Vital Signs */}
                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">
                                                <Badge
                                                    className="bg-green-500 cursor-pointer select-none"
                                                    onDoubleClick={() => {
                                                        const rand = (
                                                            min: number,
                                                            max: number
                                                        ) =>
                                                            Math.floor(
                                                                Math.random() *
                                                                    (max -
                                                                        min +
                                                                        1)
                                                            ) + min;
                                                        const randFloat = (
                                                            min: number,
                                                            max: number
                                                        ) =>
                                                            (
                                                                Math.random() *
                                                                    (max -
                                                                        min) +
                                                                min
                                                            ).toFixed(1);

                                                        setData((prev) => ({
                                                            ...prev,
                                                            bp_systolic: rand(
                                                                110,
                                                                129
                                                            ).toString(),
                                                            bp_diastolic: rand(
                                                                70,
                                                                84
                                                            ).toString(),
                                                            pulse: rand(
                                                                60,
                                                                100
                                                            ).toString(),
                                                            rr: rand(
                                                                16,
                                                                20
                                                            ).toString(),
                                                            temp: randFloat(
                                                                36.1,
                                                                37.2
                                                            ),
                                                            spo2: rand(
                                                                97,
                                                                100
                                                            ).toString(),
                                                        }));
                                                    }}
                                                    title="Double click to generate normal values"
                                                >
                                                    O
                                                </Badge>
                                                Tanda Vital (Objective)
                                            </Label>
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                                                <div className="space-y-1">
                                                    <Label
                                                        htmlFor="bp_systolic"
                                                        className="text-xs"
                                                    >
                                                        Sistole
                                                    </Label>
                                                    <Input
                                                        id="bp_systolic"
                                                        type="number"
                                                        value={data.bp_systolic}
                                                        onChange={(e) =>
                                                            setData(
                                                                "bp_systolic",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="120"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label
                                                        htmlFor="bp_diastolic"
                                                        className="text-xs"
                                                    >
                                                        Diastole
                                                    </Label>
                                                    <Input
                                                        id="bp_diastolic"
                                                        type="number"
                                                        value={
                                                            data.bp_diastolic
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "bp_diastolic",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="80"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label
                                                        htmlFor="pulse"
                                                        className="text-xs"
                                                    >
                                                        Nadi
                                                    </Label>
                                                    <Input
                                                        id="pulse"
                                                        type="number"
                                                        value={data.pulse}
                                                        onChange={(e) =>
                                                            setData(
                                                                "pulse",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="80"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label
                                                        htmlFor="rr"
                                                        className="text-xs"
                                                    >
                                                        RR
                                                    </Label>
                                                    <Input
                                                        id="rr"
                                                        type="number"
                                                        value={data.rr}
                                                        onChange={(e) =>
                                                            setData(
                                                                "rr",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="20"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label
                                                        htmlFor="temp"
                                                        className="text-xs"
                                                    >
                                                        Suhu (°C)
                                                    </Label>
                                                    <Input
                                                        id="temp"
                                                        type="number"
                                                        step="0.1"
                                                        value={data.temp}
                                                        onChange={(e) =>
                                                            setData(
                                                                "temp",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="36.5"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label
                                                        htmlFor="spo2"
                                                        className="text-xs"
                                                    >
                                                        SpO2 (%)
                                                    </Label>
                                                    <Input
                                                        id="spo2"
                                                        type="number"
                                                        value={data.spo2}
                                                        onChange={(e) =>
                                                            setData(
                                                                "spo2",
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="98"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Assessment */}
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="diagnosis_id"
                                                className="flex items-center gap-2"
                                            >
                                                <Badge className="bg-orange-500">
                                                    A
                                                </Badge>
                                                Diagnosa (Assessment)
                                            </Label>
                                            <Select
                                                value={data.diagnosis_id}
                                                onValueChange={(v) =>
                                                    setData("diagnosis_id", v)
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih diagnosa" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {diagnoses.map((d) => (
                                                        <SelectItem
                                                            key={d.id}
                                                            value={String(d.id)}
                                                        >
                                                            {d.icd10_code} -{" "}
                                                            {d.name_id}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Plan */}
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="plan"
                                                className="flex items-center gap-2"
                                            >
                                                <Badge className="bg-purple-500">
                                                    P
                                                </Badge>
                                                Rencana (Plan)
                                            </Label>
                                            <Textarea
                                                id="plan"
                                                value={data.plan}
                                                onChange={(e) =>
                                                    setData(
                                                        "plan",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Rencana tindakan..."
                                                className="min-h-[60px]"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* RIGHT COLUMN - Medicines & Actions */}
                            <div className="space-y-6">
                                {/* Visit Info */}
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center gap-2">
                                            <Activity className="h-5 w-5 text-red-500" />
                                            <CardTitle>
                                                Info Kunjungan
                                            </CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="visit_date">
                                                    Tanggal
                                                </Label>
                                                <Input
                                                    id="visit_date"
                                                    type="date"
                                                    value={data.visit_date}
                                                    onChange={(e) =>
                                                        setData(
                                                            "visit_date",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="visit_time">
                                                    Waktu
                                                </Label>
                                                <Input
                                                    id="visit_time"
                                                    type="time"
                                                    value={data.visit_time}
                                                    onChange={(e) =>
                                                        setData(
                                                            "visit_time",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="action_status">
                                                Tindak Lanjut
                                            </Label>
                                            <Select
                                                value={data.action_status}
                                                onValueChange={(v) =>
                                                    setData("action_status", v)
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih tindak lanjut" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="lanjut_kerja">
                                                        Lanjut Kerja
                                                    </SelectItem>
                                                    <SelectItem value="pulang">
                                                        Pulang
                                                    </SelectItem>
                                                    <SelectItem value="dirujuk">
                                                        Dirujuk
                                                    </SelectItem>
                                                    <SelectItem value="rawat_inap">
                                                        Rawat Inap
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Medicines */}
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Pill className="h-5 w-5 text-blue-500" />
                                                <CardTitle>Obat</CardTitle>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={addMedicine}
                                            >
                                                <Plus className="h-4 w-4 mr-1" />
                                                Tambah
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {medicineList.length === 0 ? (
                                            <p className="text-sm text-muted-foreground text-center py-4">
                                                Belum ada obat ditambahkan
                                            </p>
                                        ) : (
                                            medicineList.map((med, index) => (
                                                <div
                                                    key={index}
                                                    className="flex gap-2 items-end p-3 bg-slate-50 dark:bg-slate-900 rounded-lg"
                                                >
                                                    <div className="flex-1 space-y-2">
                                                        <Select
                                                            value={
                                                                med.medicine_id
                                                            }
                                                            onValueChange={(
                                                                v
                                                            ) =>
                                                                updateMedicine(
                                                                    index,
                                                                    "medicine_id",
                                                                    v
                                                                )
                                                            }
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Pilih obat" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {medicines.map(
                                                                    (m) => (
                                                                        <SelectItem
                                                                            key={
                                                                                m.id
                                                                            }
                                                                            value={String(
                                                                                m.id
                                                                            )}
                                                                        >
                                                                            {
                                                                                m.name
                                                                            }
                                                                        </SelectItem>
                                                                    )
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                        <div className="grid grid-cols-3 gap-2">
                                                            <Input
                                                                type="number"
                                                                min="1"
                                                                value={
                                                                    med.quantity
                                                                }
                                                                onChange={(e) =>
                                                                    updateMedicine(
                                                                        index,
                                                                        "quantity",
                                                                        parseInt(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        ) || 1
                                                                    )
                                                                }
                                                                placeholder="Qty"
                                                            />
                                                            <Input
                                                                value={
                                                                    med.dosage
                                                                }
                                                                onChange={(e) =>
                                                                    updateMedicine(
                                                                        index,
                                                                        "dosage",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                placeholder="Dosis"
                                                            />
                                                            <Input
                                                                value={
                                                                    med.frequency
                                                                }
                                                                onChange={(e) =>
                                                                    updateMedicine(
                                                                        index,
                                                                        "frequency",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                placeholder="Freq"
                                                            />
                                                        </div>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            removeMedicine(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4 text-red-500" />
                                                    </Button>
                                                </div>
                                            ))
                                        )}
                                    </CardContent>
                                </Card>

                                {/* Submit Button */}
                                <div className="sticky bottom-6">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full text-lg h-12"
                                        disabled={processing}
                                    >
                                        <Save className="mr-2 h-5 w-5" />
                                        {processing
                                            ? "Menyimpan..."
                                            : "Simpan Kunjungan"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
