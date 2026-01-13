import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    FileText,
    Building2,
    Briefcase,
    Users,
    Cake,
    Plus,
    Pencil,
} from "lucide-react";

interface Medicine {
    name: string;
    qty: number;
}

interface LabTest {
    type: string;
    result: string;
    normal: boolean;
}

interface MedicalRecord {
    id: number;
    employee: string;
    company: string;
    department: string;
    position: string;
    age: number;
    medicines: Medicine[];
    complaint: string;
    diagnosis: string;
    workDay: string;
    actionStatus: string;
    bp: string;
    pulse: number;
    rr: number;
    temp: number;
    spo2: number;
    labTests: LabTest[];
    pic: string;
    time: string;
    status: string;
    date: string;
}

interface EmployeeData {
    id: number;
    name: string;
    company: string;
    department: string | null;
    position: string | null;
    age: number;
    gender: string;
}

interface Props {
    employee: string;
    employeeData: EmployeeData;
    history: MedicalRecord[];
}

export default function RekamMedis({ employee, employeeData, history }: Props) {
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

    const patientInfo = history.length > 0 ? history[0] : null;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Rekam Medis - {employee}
                </h2>
            }
        >
            <Head title={`Rekam Medis - ${employee}`} />

            <div className="py-8">
                <div className="mx-auto w-full px-6 lg:px-12">
                    {/* Back Button */}
                    <div className="mb-6">
                        <Button
                            variant="outline"
                            className="gap-2"
                            onClick={() =>
                                router.visit(route("kunjungan.berobat.index"))
                            }
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke Daftar Kunjungan
                        </Button>
                    </div>

                    {/* Header Card */}
                    <Card className="mb-6">
                        <CardHeader className="pb-4">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="text-2xl mb-2">
                                        Rekam Medis Pasien
                                    </CardTitle>
                                    <div className="text-lg font-semibold text-foreground mb-3">
                                        {employee}
                                    </div>
                                    {patientInfo && (
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="flex items-center gap-2 text-sm">
                                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <div className="text-xs text-muted-foreground">
                                                        Perusahaan
                                                    </div>
                                                    <div className="font-medium">
                                                        {patientInfo.company}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Users className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <div className="text-xs text-muted-foreground">
                                                        Departemen
                                                    </div>
                                                    <div className="font-medium">
                                                        {patientInfo.department}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <div className="text-xs text-muted-foreground">
                                                        Posisi
                                                    </div>
                                                    <div className="font-medium">
                                                        {patientInfo.position}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Cake className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <div className="text-xs text-muted-foreground">
                                                        Usia
                                                    </div>
                                                    <div className="font-medium">
                                                        {patientInfo.age} Tahun
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <Badge variant="secondary" className="text-sm">
                                    {history.length} Kunjungan
                                </Badge>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Medical History Timeline */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-lg">
                                Riwayat Kunjungan
                            </h3>
                            <Button
                                onClick={() =>
                                    router.visit(
                                        route("kunjungan.berobat.create", {
                                            employee_id: employeeData.id,
                                        })
                                    )
                                }
                                className="gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                Tambah Data
                            </Button>
                        </div>

                        {history.length > 0 ? (
                            <div className="space-y-4">
                                {history.map((record, idx) => (
                                    <Card
                                        key={record.id}
                                        className="border-l-4 border-l-primary/50 hover:shadow-md transition-shadow"
                                    >
                                        <CardContent className="p-6">
                                            {/* Header */}
                                            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-5 gap-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                                        <span className="font-semibold text-base">
                                                            {record.date}
                                                        </span>
                                                        <span className="text-muted-foreground">
                                                            •
                                                        </span>
                                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                                        <span>
                                                            {record.time}
                                                        </span>
                                                        <span className="text-muted-foreground">
                                                            •
                                                        </span>
                                                        <span className="text-muted-foreground">
                                                            {record.workDay}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    {getStatusBadge(
                                                        record.status
                                                    )}
                                                    {getActionStatusBadge(
                                                        record.actionStatus
                                                    )}
                                                </div>
                                            </div>

                                            {/* SOAP Format - 2x2 Grid Compact */}
                                            <div className="grid md:grid-cols-2 gap-3">
                                                {/* S - Subjective */}
                                                <div className="rounded-lg border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20 p-3">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-xs">
                                                            S
                                                        </div>
                                                        <h4 className="font-semibold text-sm">
                                                            Subjective
                                                        </h4>
                                                    </div>
                                                    <p className="text-xs leading-snug ml-8">
                                                        {record.complaint}
                                                    </p>
                                                </div>

                                                {/* O - Objective */}
                                                <div className="rounded-lg border-l-4 border-l-green-500 bg-green-50/50 dark:bg-green-950/20 p-3">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white font-bold text-xs">
                                                            O
                                                        </div>
                                                        <h4 className="font-semibold text-sm">
                                                            Objective
                                                        </h4>
                                                    </div>
                                                    <div className="ml-8 space-y-2">
                                                        {/* Vital Signs */}
                                                        <div>
                                                            <h5 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                                                                Vital
                                                            </h5>
                                                            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                                                                <div className="flex items-center gap-0.5">
                                                                    <span className="text-muted-foreground">
                                                                        TD:
                                                                    </span>
                                                                    <span className="font-semibold">
                                                                        {
                                                                            record.bp
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <span className="text-muted-foreground">
                                                                    •
                                                                </span>
                                                                <div className="flex items-center gap-0.5">
                                                                    <span className="text-muted-foreground">
                                                                        Nadi:
                                                                    </span>
                                                                    <span className="font-semibold">
                                                                        {
                                                                            record.pulse
                                                                        }
                                                                        /m
                                                                    </span>
                                                                </div>
                                                                <span className="text-muted-foreground">
                                                                    •
                                                                </span>
                                                                <div className="flex items-center gap-0.5">
                                                                    <span className="text-muted-foreground">
                                                                        RR:
                                                                    </span>
                                                                    <span className="font-semibold">
                                                                        {
                                                                            record.rr
                                                                        }
                                                                        /m
                                                                    </span>
                                                                </div>
                                                                <span className="text-muted-foreground">
                                                                    •
                                                                </span>
                                                                <div className="flex items-center gap-0.5">
                                                                    <span className="text-muted-foreground">
                                                                        Suhu:
                                                                    </span>
                                                                    <span className="font-semibold">
                                                                        {
                                                                            record.temp
                                                                        }
                                                                        °C
                                                                    </span>
                                                                </div>
                                                                <span className="text-muted-foreground">
                                                                    •
                                                                </span>
                                                                <div className="flex items-center gap-0.5">
                                                                    <span className="text-muted-foreground">
                                                                        SpO2:
                                                                    </span>
                                                                    <span className="font-semibold">
                                                                        {
                                                                            record.spo2
                                                                        }
                                                                        %
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Lab Results */}
                                                        {record.labTests
                                                            .length > 0 && (
                                                            <div>
                                                                <h5 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                                                                    Lab
                                                                </h5>
                                                                <div className="space-y-0.5">
                                                                    {record.labTests.map(
                                                                        (
                                                                            lab,
                                                                            idx
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    idx
                                                                                }
                                                                                className="flex items-center gap-1.5 text-[11px]"
                                                                            >
                                                                                <Badge
                                                                                    variant={
                                                                                        lab.normal
                                                                                            ? "default"
                                                                                            : "destructive"
                                                                                    }
                                                                                    className="text-[10px] px-1.5 py-0 h-4 shrink-0"
                                                                                >
                                                                                    {
                                                                                        lab.type
                                                                                    }
                                                                                </Badge>
                                                                                <span className="text-muted-foreground text-[11px]">
                                                                                    {
                                                                                        lab.result
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* A - Assessment */}
                                                <div className="rounded-lg border-l-4 border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/20 p-3">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white font-bold text-xs">
                                                            A
                                                        </div>
                                                        <h4 className="font-semibold text-sm">
                                                            Assessment
                                                        </h4>
                                                    </div>
                                                    <div className="ml-8">
                                                        <Badge
                                                            variant="secondary"
                                                            className="text-xs px-2 py-0.5"
                                                        >
                                                            {record.diagnosis}
                                                        </Badge>
                                                    </div>
                                                </div>

                                                {/* P - Planning */}
                                                <div className="rounded-lg border-l-4 border-l-purple-500 bg-purple-50/50 dark:bg-purple-950/20 p-3">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500 text-white font-bold text-xs">
                                                            P
                                                        </div>
                                                        <h4 className="font-semibold text-sm">
                                                            Planning
                                                        </h4>
                                                    </div>
                                                    <div className="ml-8 space-y-2">
                                                        {/* Terapi */}
                                                        <div>
                                                            <h5 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                                                                Terapi
                                                            </h5>
                                                            <div className="flex flex-wrap gap-1">
                                                                {record.medicines.map(
                                                                    (
                                                                        med,
                                                                        idx
                                                                    ) => (
                                                                        <Badge
                                                                            key={
                                                                                idx
                                                                            }
                                                                            variant="outline"
                                                                            className="text-[10px] px-1.5 py-0 h-4"
                                                                        >
                                                                            {
                                                                                med.name
                                                                            }{" "}
                                                                            (
                                                                            {
                                                                                med.qty
                                                                            }
                                                                            x)
                                                                        </Badge>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Action Status */}
                                                        <div>
                                                            <h5 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                                                                Tindak Lanjut
                                                            </h5>
                                                            <div className="scale-90 origin-left">
                                                                {getActionStatusBadge(
                                                                    record.actionStatus
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="mt-6 pt-6 border-t flex items-center justify-between text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4" />
                                                    <span>
                                                        Petugas:{" "}
                                                        <strong>
                                                            {record.pic}
                                                        </strong>
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {idx === 0 && (
                                                        <Badge
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            Kunjungan Terbaru
                                                        </Badge>
                                                    )}
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            router.visit(
                                                                route(
                                                                    "kunjungan.berobat.edit",
                                                                    record.id
                                                                )
                                                            )
                                                        }
                                                    >
                                                        <Pencil className="h-4 w-4 mr-1" />
                                                        Edit
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="text-center py-16">
                                    <FileText className="h-16 w-16 mx-auto mb-4 opacity-20" />
                                    <h3 className="text-lg font-semibold mb-2">
                                        Belum Ada Riwayat Kunjungan
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Pasien belum memiliki riwayat kunjungan
                                        berobat.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
