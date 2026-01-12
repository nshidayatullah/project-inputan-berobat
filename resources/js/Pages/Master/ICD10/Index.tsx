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
import { Input } from "@/Components/ui/input";
import { Badge } from "@/Components/ui/badge";
import { Switch } from "@/Components/ui/switch";
import { Search, Plus, FileText, Filter } from "lucide-react";

export default function ICD10Index() {
    // Dummy Data for ICD 10
    const diagnoses = [
        {
            id: 1,
            code: "A00.0",
            name: "Cholera due to Vibrio cholerae 01, biovar cholerae",
            description: "Infeksi bakteri Vibrio cholerae",
            category: "Certain infectious and parasitic diseases",
            isActive: true,
        },
        {
            id: 2,
            code: "A01.0",
            name: "Typhoid fever",
            description: "Demam tifoid (Tipes)",
            category: "Certain infectious and parasitic diseases",
            isActive: true,
        },
        {
            id: 3,
            code: "E11.9",
            name: "Type 2 diabetes mellitus without complications",
            description: "Diabetes tipe 2 tanpa komplikasi",
            category: "Endocrine, nutritional and metabolic diseases",
            isActive: true,
        },
        {
            id: 4,
            code: "I10",
            name: "Essential (primary) hypertension",
            description: "Darah tinggi primer",
            category: "Diseases of the circulatory system",
            isActive: true,
        },
        {
            id: 5,
            code: "J00",
            name: "Acute nasopharyngitis [common cold]",
            description: "Flu biasa",
            category: "Diseases of the respiratory system",
            isActive: false,
        },
        {
            id: 6,
            code: "K29.7",
            name: "Gastritis, unspecified",
            description: "Radang lambung (Maag)",
            category: "Diseases of the digestive system",
            isActive: true,
        },
        {
            id: 7,
            code: "M54.5",
            name: "Low back pain",
            description: "Nyeri punggung bawah",
            category: "Diseases of the musculoskeletal system",
            isActive: true,
        },
        {
            id: 8,
            code: "R50.9",
            name: "Fever, unspecified",
            description: "Demam tidak spesifik",
            category:
                "Symptoms, signs and abnormal clinical and laboratory findings",
            isActive: true,
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Master Data / Diagnosa ICD 10
                </h2>
            }
        >
            <Head title="Diagnosa ICD 10" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Daftar Diagnosa ICD 10</CardTitle>
                                <CardDescription>
                                    Referensi kode diagnosa standar
                                    internasional (ICD-10).
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Cari kode atau nama diagnosa..."
                                        className="pl-8 w-[300px]"
                                    />
                                </div>
                                <Button variant="outline">
                                    <Filter className="mr-2 h-4 w-4" /> Filter
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">
                                            No.
                                        </TableHead>
                                        <TableHead className="w-[100px]">
                                            Kode
                                        </TableHead>
                                        <TableHead>
                                            Diagnosa (English)
                                        </TableHead>
                                        <TableHead>
                                            Deskripsi (Indonesia)
                                        </TableHead>
                                        <TableHead>Kategori</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">
                                            Aksi
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {diagnoses.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className="font-mono"
                                                >
                                                    {item.code}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {item.name}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {item.description}
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-xs text-muted-foreground italic">
                                                    {item.category}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Switch
                                                    checked={item.isActive}
                                                    aria-label="Toggle active status"
                                                />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                >
                                                    <FileText className="h-4 w-4" />
                                                    <span className="sr-only">
                                                        Detail
                                                    </span>
                                                </Button>
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
