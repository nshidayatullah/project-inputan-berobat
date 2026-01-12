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
import { Pencil, Trash2, Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";

export default function ObatIndex() {
    // Dummy data for Obat (Medicines)
    const medicines = [
        {
            id: 1,
            name: "Paracetamol",
            code: "PC500",
            category: "Analgesik",
            stock: 150,
            unit: "Strip",
        },
        {
            id: 2,
            name: "Amoxicillin",
            code: "AMX500",
            category: "Antibiotik",
            stock: 50,
            unit: "Strip",
        },
        {
            id: 3,
            name: "Omeprazole",
            code: "OMP20",
            category: "Antasida",
            stock: 80,
            unit: "Strip",
        },
        {
            id: 4,
            name: "Cetirizine",
            code: "CTZ10",
            category: "Antihistamin",
            stock: 100,
            unit: "Strip",
        },
        {
            id: 5,
            name: "Vitamin C",
            code: "VTC500",
            category: "Vitamin",
            stock: 200,
            unit: "Botol",
        },
    ];

    // Dummy data for BMHP (Bahan Medis Habis Pakai) (Consumables)
    const bmhps = [
        {
            id: 1,
            name: "Spuit 3cc",
            code: "SP3CC",
            category: "Alat Suntik",
            stock: 300,
            unit: "Pcs",
        },
        {
            id: 2,
            name: "Kasa Steril",
            code: "KS001",
            category: "Perban",
            stock: 100,
            unit: "Box",
        },
        {
            id: 3,
            name: "Alkohol Swab",
            code: "ASWAB",
            category: "Antiseptik",
            stock: 500,
            unit: "Box",
        },
        {
            id: 4,
            name: "Masker Medis",
            code: "MASK",
            category: "APD",
            stock: 200,
            unit: "Box",
        },
        {
            id: 5,
            name: "Handscoon",
            code: "GLOVE",
            category: "APD",
            stock: 150,
            unit: "Box",
        },
    ];

    const renderTable = (data: any[], typeLabel: string) => (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Daftar {typeLabel}</CardTitle>
                    <CardDescription>
                        Kelola data {typeLabel.toLowerCase()} di sini.
                    </CardDescription>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> Tambah {typeLabel}
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">No.</TableHead>
                            <TableHead>Nama {typeLabel}</TableHead>
                            <TableHead>Kode</TableHead>
                            <TableHead>Kategori</TableHead>
                            <TableHead>Stok</TableHead>
                            <TableHead>Satuan</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((item: any, index: number) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">
                                    {index + 1}
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.code}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>{item.stock}</TableCell>
                                <TableCell>{item.unit}</TableCell>
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
    );

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Data Obat & BMHP
                </h2>
            }
        >
            <Head title="Data Obat & BMHP" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Tabs defaultValue="obat" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="obat">Obat</TabsTrigger>
                            <TabsTrigger value="bmhp">BMHP</TabsTrigger>
                        </TabsList>

                        <TabsContent value="obat">
                            {renderTable(medicines, "Obat")}
                        </TabsContent>

                        <TabsContent value="bmhp">
                            {renderTable(bmhps, "BMHP")}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
