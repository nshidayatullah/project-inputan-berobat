import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
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
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { DatePicker } from "@/Components/ui/date-picker";
import { format } from "date-fns";
import { ChevronLeft, User, Briefcase, Phone, Save } from "lucide-react";
import { useEffect, useState } from "react";

interface CreateProps {
    companies: { id: number; name: string }[];
}

export default function KaryawanCreate({ companies }: CreateProps) {
    const [departments, setDepartments] = useState<
        { id: number; name: string }[]
    >([]);
    const [positions, setPositions] = useState<{ id: number; name: string }[]>(
        []
    );

    const { data, setData, post, processing, errors } = useForm({
        company_id: "",
        department_id: "",
        position_id: "",
        employee_number: "",
        nik_bib: "",
        nik: "",
        name: "",
        date_of_birth: "",
        gender: "male",
        phone: "",
        email: "",
        address: "",
        blood_type: "unknown",
        emergency_contact_name: "",
        emergency_contact_phone: "",
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const nameParam = urlParams.get("name");
        if (nameParam) {
            setData("name", nameParam);
        }
    }, []);

    const fetchDepartments = async (companyId: string) => {
        if (!companyId) return;
        const res = await fetch(
            route("master.karyawan.departments", companyId)
        );
        const json = await res.json();
        setDepartments(json);
    };

    const fetchPositions = async (companyId: string) => {
        if (!companyId) return;
        const res = await fetch(route("master.karyawan.positions", companyId));
        const json = await res.json();
        setPositions(json);
    };

    const handleCompanyChange = (val: string) => {
        setData("company_id", val);
        setData("department_id", "");
        setData("position_id", "");
        fetchDepartments(val);
        fetchPositions(val);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("master.karyawan.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href={route("master.karyawan.index")}>
                        <Button variant="ghost" size="icon">
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Tambah Karyawan Baru
                    </h2>
                </div>
            }
        >
            <Head title="Tambah Karyawan" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* LEFT COLUMN - Personal Info */}
                            <div className="lg:col-span-2 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center gap-2">
                                            <User className="h-5 w-5 text-blue-500" />
                                            <CardTitle>Data Pribadi</CardTitle>
                                        </div>
                                        <CardDescription>
                                            Informasi identitas dan kontak
                                            pribadi.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">
                                                    Nama Lengkap *
                                                </Label>
                                                <Input
                                                    id="name"
                                                    value={data.name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "name",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Contoh: Budi Santoso"
                                                />
                                                {errors.name && (
                                                    <p className="text-sm text-red-500">
                                                        {errors.name}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="nik">
                                                    NIK KTP (16 Digit)
                                                </Label>
                                                <Input
                                                    id="nik"
                                                    value={data.nik}
                                                    onChange={(e) =>
                                                        setData(
                                                            "nik",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="35..."
                                                    maxLength={16}
                                                />
                                                {errors.nik && (
                                                    <p className="text-sm text-red-500">
                                                        {errors.nik}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <Label>Jenis Kelamin *</Label>
                                                <RadioGroup
                                                    value={data.gender}
                                                    onValueChange={(val) =>
                                                        setData("gender", val)
                                                    }
                                                    className="flex gap-4"
                                                >
                                                    <div className="flex items-center space-x-2 border rounded-md p-3 w-full cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                                        <RadioGroupItem
                                                            value="male"
                                                            id="gender-male"
                                                        />
                                                        <Label
                                                            htmlFor="gender-male"
                                                            className="cursor-pointer flex-1"
                                                        >
                                                            Laki-laki
                                                        </Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2 border rounded-md p-3 w-full cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                                                        <RadioGroupItem
                                                            value="female"
                                                            id="gender-female"
                                                        />
                                                        <Label
                                                            htmlFor="gender-female"
                                                            className="cursor-pointer flex-1"
                                                        >
                                                            Perempuan
                                                        </Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Tanggal Lahir</Label>
                                                <DatePicker
                                                    date={
                                                        data.date_of_birth
                                                            ? new Date(
                                                                  data.date_of_birth
                                                              )
                                                            : undefined
                                                    }
                                                    setDate={(date) =>
                                                        setData(
                                                            "date_of_birth",
                                                            date
                                                                ? format(
                                                                      date,
                                                                      "yyyy-MM-dd"
                                                                  )
                                                                : ""
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <Label>Golongan Darah</Label>
                                            <RadioGroup
                                                value={data.blood_type}
                                                onValueChange={(val) =>
                                                    setData("blood_type", val)
                                                }
                                                className="flex flex-wrap gap-2"
                                            >
                                                {[
                                                    "A",
                                                    "B",
                                                    "AB",
                                                    "O",
                                                    "unknown",
                                                ].map((type) => (
                                                    <div
                                                        key={type}
                                                        className="flex items-center space-x-2 border rounded-md px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                                                    >
                                                        <RadioGroupItem
                                                            value={type}
                                                            id={`blood-${type}`}
                                                        />
                                                        <Label
                                                            htmlFor={`blood-${type}`}
                                                            className="cursor-pointer font-medium uppercase"
                                                        >
                                                            {type === "unknown"
                                                                ? "Tidak Tahu"
                                                                : type}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">
                                                    No. Telepon
                                                </Label>
                                                <Input
                                                    id="phone"
                                                    value={data.phone}
                                                    onChange={(e) =>
                                                        setData(
                                                            "phone",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="08..."
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">
                                                    Email
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={data.email}
                                                    onChange={(e) =>
                                                        setData(
                                                            "email",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="nama@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="address">
                                                Alamat Domisili
                                            </Label>
                                            <Textarea
                                                id="address"
                                                value={data.address}
                                                onChange={(e) =>
                                                    setData(
                                                        "address",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Jl. ..."
                                                className="min-h-[100px]"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* RIGHT COLUMN - Work & Emergency Info */}
                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="h-5 w-5 text-green-500" />
                                            <CardTitle>
                                                Informasi Pekerjaan
                                            </CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="company_id">
                                                Perusahaan *
                                            </Label>
                                            <Select
                                                value={data.company_id}
                                                onValueChange={
                                                    handleCompanyChange
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih Perusahaan" />
                                                </SelectTrigger>
                                                <SelectContent>
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
                                            {errors.company_id && (
                                                <p className="text-sm text-red-500">
                                                    {errors.company_id}
                                                </p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="employee_number">
                                                    NRP *
                                                </Label>
                                                <Input
                                                    id="employee_number"
                                                    value={data.employee_number}
                                                    onChange={(e) =>
                                                        setData(
                                                            "employee_number",
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="XX-XXX"
                                                />
                                                {errors.employee_number && (
                                                    <p className="text-sm text-red-500">
                                                        {errors.employee_number}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="nik_bib">
                                                    NIK BIB
                                                </Label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <span className="text-gray-500 sm:text-sm">
                                                            C-
                                                        </span>
                                                    </div>
                                                    <Input
                                                        id="nik_bib"
                                                        value={data.nik_bib.replace(
                                                            /^C-/,
                                                            ""
                                                        )}
                                                        onChange={(e) => {
                                                            const val =
                                                                e.target.value;
                                                            if (
                                                                val &&
                                                                !/^\d*$/.test(
                                                                    val
                                                                )
                                                            )
                                                                return;

                                                            if (val === "") {
                                                                setData(
                                                                    "nik_bib",
                                                                    ""
                                                                );
                                                            } else {
                                                                setData(
                                                                    "nik_bib",
                                                                    `C-${val}`
                                                                );
                                                            }
                                                        }}
                                                        className="pl-8"
                                                        placeholder="021863"
                                                        maxLength={6}
                                                    />
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    Masukkan angka saja (Maks 6
                                                    digit)
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="department_id">
                                                Departemen
                                            </Label>
                                            <Select
                                                value={data.department_id}
                                                onValueChange={(v) =>
                                                    setData("department_id", v)
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih Departemen" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {departments.length ===
                                                    0 ? (
                                                        <SelectItem
                                                            value="none"
                                                            disabled
                                                        >
                                                            Pilih Perusahaan
                                                            dulu
                                                        </SelectItem>
                                                    ) : (
                                                        departments.map((d) => (
                                                            <SelectItem
                                                                key={d.id}
                                                                value={String(
                                                                    d.id
                                                                )}
                                                            >
                                                                {d.name}
                                                            </SelectItem>
                                                        ))
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="position_id">
                                                Jabatan
                                            </Label>
                                            <Select
                                                value={data.position_id}
                                                onValueChange={(v) =>
                                                    setData("position_id", v)
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih Jabatan" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {positions.length === 0 ? (
                                                        <SelectItem
                                                            value="none"
                                                            disabled
                                                        >
                                                            Pilih Perusahaan
                                                            dulu
                                                        </SelectItem>
                                                    ) : (
                                                        positions.map((p) => (
                                                            <SelectItem
                                                                key={p.id}
                                                                value={String(
                                                                    p.id
                                                                )}
                                                            >
                                                                {p.name}
                                                            </SelectItem>
                                                        ))
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-5 w-5 text-red-500" />
                                            <CardTitle>
                                                Kontak Darurat
                                            </CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="emergency_contact_name">
                                                Nama Kerabat
                                            </Label>
                                            <Input
                                                id="emergency_contact_name"
                                                value={
                                                    data.emergency_contact_name
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "emergency_contact_name",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Nama kerabat..."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="emergency_contact_phone">
                                                No. Telepon
                                            </Label>
                                            <Input
                                                id="emergency_contact_phone"
                                                value={
                                                    data.emergency_contact_phone
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "emergency_contact_phone",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="08..."
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

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
                                            : "Simpan Data Karyawan"}
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
