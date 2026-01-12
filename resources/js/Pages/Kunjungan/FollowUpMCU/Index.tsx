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
import { Textarea } from "@/Components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

export default function FollowUpMCUIndex() {
    // Dummy Data
    const historyMcu = [
        {
            id: 1,
            date: "2023-10-20",
            employee: "Andi Siregar",
            note: "Kolesterol Tinggi",
            status: "Konsultasi Dokter",
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Follow Up MCU
                </h2>
            }
        >
            <Head title="Follow Up MCU" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Follow Up MCU</CardTitle>
                            <CardDescription>
                                Tindak lanjut hasil Medical Check Up.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Search / Input Section */}
                            <div className="flex w-full items-center space-x-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Cari nama karyawan untuk follow up MCU..."
                                        className="pl-8"
                                    />
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" />{" "}
                                            Input Follow Up
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[600px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Input Follow Up MCU
                                            </DialogTitle>
                                            <DialogDescription>
                                                Masukkan data follow up MCU
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
                                                    htmlFor="note"
                                                    className="text-right"
                                                >
                                                    Catatan Medis
                                                </Label>
                                                <Textarea
                                                    id="note"
                                                    placeholder="Catatan hasil MCU..."
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label
                                                    htmlFor="status"
                                                    className="text-right"
                                                >
                                                    Status
                                                </Label>
                                                <Select>
                                                    <SelectTrigger className="col-span-3">
                                                        <SelectValue placeholder="Pilih Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="fit">
                                                            Fit
                                                        </SelectItem>
                                                        <SelectItem value="fit_with_note">
                                                            Fit with Note
                                                        </SelectItem>
                                                        <SelectItem value="unfit">
                                                            Unfit
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
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
                                            <TableHead>Catatan</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {historyMcu.length > 0 ? (
                                            historyMcu.map((item, index) => (
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
                                                        {item.note}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.status}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={5}
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
