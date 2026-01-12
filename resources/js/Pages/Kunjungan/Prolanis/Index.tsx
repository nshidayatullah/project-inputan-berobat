import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Search, Plus } from "lucide-react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

export default function ProlanisIndex() {
    // Dummy Data
    const historyProlanis = [
        {
            id: 1,
            date: "2023-10-15",
            employee: "Joko Susilo",
            program: "Diabetes",
            activity: "Senam",
            status: "Hadir",
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Prolanis
                </h2>
            }
        >
            <Head title="Prolanis" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Prolanis</CardTitle>
                            <CardDescription>
                                Program Pengelolaan Penyakit Kronis.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Search / Input Section */}
                            <div className="flex w-full items-center space-x-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Cari nama karyawan peserta Prolanis..."
                                        className="pl-8"
                                    />
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" />{" "}
                                            Input Aktivitas
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Input Prolanis
                                            </DialogTitle>
                                            <DialogDescription>
                                                Masukkan data aktivitas prolanis
                                                disini. Klik simpan setelah
                                                selesai.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="date"
                                                    className="text-right"
                                                >
                                                    Tanggal
                                                </Label>
                                                <Input
                                                    id="date"
                                                    type="date"
                                                    className="col-span-3"
                                                />
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
                                                    htmlFor="program"
                                                    className="text-right"
                                                >
                                                    Program
                                                </Label>
                                                <Select>
                                                    <SelectTrigger className="col-span-3">
                                                        <SelectValue placeholder="Pilih Program" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="diabetes">
                                                            Diabetes Melitus
                                                        </SelectItem>
                                                        <SelectItem value="hypertension">
                                                            Hipertensi
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="activity"
                                                    className="text-right"
                                                >
                                                    Aktivitas
                                                </Label>
                                                <Input
                                                    id="activity"
                                                    placeholder="Contoh: Senam, Edukasi..."
                                                    className="col-span-3"
                                                />
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

                            {/* History Table */}
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px]">
                                                No.
                                            </TableHead>
                                            <TableHead>Tanggal</TableHead>
                                            <TableHead>Nama Karyawan</TableHead>
                                            <TableHead>Program</TableHead>
                                            <TableHead>Aktivitas</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {historyProlanis.length > 0 ? (
                                            historyProlanis.map(
                                                (item, index) => (
                                                    <TableRow key={item.id}>
                                                        <TableCell>
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.date}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.employee}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.program}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.activity}
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.status}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={6}
                                                    className="h-24 text-center"
                                                >
                                                    Tidak ada data.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
