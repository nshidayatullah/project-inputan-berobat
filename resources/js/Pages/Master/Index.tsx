import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/Components/ui/card";

export default function MasterIndex() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Master Data
                </h2>
            }
        >
            <Head title="Master Data" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Master Data Overview</CardTitle>
                            <CardDescription>
                                Manage your master data here.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>
                                Here you will manage patients, medicines, and
                                other master data.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
