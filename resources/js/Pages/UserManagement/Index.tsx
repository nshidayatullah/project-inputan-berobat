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
import { Badge } from "../../Components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import {
    Pencil,
    Trash2,
    Plus,
    Search,
    Shield,
    Users,
    MoreHorizontal,
    Key,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

export default function UserManagementIndex() {
    // Dummy Data for Users
    const users = [
        {
            id: 1,
            name: "Dr. Setiawan Sp.PD",
            email: "dr.setiawan@hospital.com",
            role: "Dokter",
            status: "Active",
            lastLogin: "2023-10-26 09:00",
        },
        {
            id: 2,
            name: "Budi Santoso, S.Kep",
            email: "budi.santoso@hospital.com",
            role: "Perawat",
            status: "Active",
            lastLogin: "2023-10-26 07:30",
        },
        {
            id: 3,
            name: "Siti Aminah, Amd.Keb",
            email: "siti.aminah@hospital.com",
            role: "Bidan",
            status: "Inactive",
            lastLogin: "2023-09-15 14:00",
        },
        {
            id: 4,
            name: "Admin Super",
            email: "admin@hospital.com",
            role: "Administrator",
            status: "Active",
            lastLogin: "2023-10-26 10:45",
        },
    ];

    // Dummy Data for Roles
    const roles = [
        {
            id: 1,
            name: "Administrator",
            usersCount: 2,
            permissions: ["all_access"],
        },
        {
            id: 2,
            name: "Dokter",
            usersCount: 5,
            permissions: [
                "view_patients",
                "edit_medical_records",
                "prescribe_medication",
            ],
        },
        {
            id: 3,
            name: "Perawat",
            usersCount: 12,
            permissions: [
                "view_patients",
                "edit_vitals",
                "administer_medication",
            ],
        },
        {
            id: 4,
            name: "Farmasi",
            usersCount: 3,
            permissions: [
                "view_prescriptions",
                "dispense_medication",
                "manage_inventory",
            ],
        },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    User & Role Management
                </h2>
            }
        >
            <Head title="User Management" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Tabs defaultValue="users" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6 max-w-[400px]">
                            <TabsTrigger value="users">
                                <Users className="mr-2 h-4 w-4" /> Users
                            </TabsTrigger>
                            <TabsTrigger value="roles">
                                <Shield className="mr-2 h-4 w-4" /> Roles &
                                Permissions
                            </TabsTrigger>
                        </TabsList>

                        {/* USERS TAB */}
                        <TabsContent value="users">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>Users</CardTitle>
                                        <CardDescription>
                                            Manage user access and accounts.
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="relative">
                                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                type="search"
                                                placeholder="Search users..."
                                                className="pl-8 w-[250px]"
                                            />
                                        </div>
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" />{" "}
                                            Add User
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead>Role</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>
                                                    Last Login
                                                </TableHead>
                                                <TableHead className="text-right">
                                                    Actions
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {users.map((user) => (
                                                <TableRow key={user.id}>
                                                    <TableCell className="font-medium">
                                                        {user.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {user.email}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="secondary">
                                                            {user.role}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <span
                                                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                                                user.status ===
                                                                "Active"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-gray-100 text-gray-800"
                                                            }`}
                                                        >
                                                            {user.status}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell>
                                                        {user.lastLogin}
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
                                                                        Open
                                                                        menu
                                                                    </span>
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuLabel>
                                                                    Actions
                                                                </DropdownMenuLabel>
                                                                <DropdownMenuItem>
                                                                    <Pencil className="mr-2 h-4 w-4" />{" "}
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem>
                                                                    <Key className="mr-2 h-4 w-4" />{" "}
                                                                    Reset
                                                                    Password
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem className="text-red-600">
                                                                    <Trash2 className="mr-2 h-4 w-4" />{" "}
                                                                    Delete
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
                        </TabsContent>

                        {/* ROLES TAB */}
                        <TabsContent value="roles">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>
                                            Roles & Permissions
                                        </CardTitle>
                                        <CardDescription>
                                            Define roles and their access
                                            levels.
                                        </CardDescription>
                                    </div>
                                    <Button>
                                        <Plus className="mr-2 h-4 w-4" /> Create
                                        Role
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Role Name</TableHead>
                                                <TableHead>
                                                    Users Count
                                                </TableHead>
                                                <TableHead>
                                                    Key Permissions
                                                </TableHead>
                                                <TableHead className="text-right">
                                                    Actions
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {roles.map((role) => (
                                                <TableRow key={role.id}>
                                                    <TableCell className="font-medium">
                                                        <div className="flex items-center gap-2">
                                                            <Shield className="h-4 w-4 text-muted-foreground" />
                                                            {role.name}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {role.usersCount} Users
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-wrap gap-1">
                                                            {role.permissions.map(
                                                                (perm, idx) => (
                                                                    <span
                                                                        key={
                                                                            idx
                                                                        }
                                                                        className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-normal text-muted-foreground bg-muted"
                                                                    >
                                                                        {perm.replace(
                                                                            /_/g,
                                                                            " "
                                                                        )}
                                                                    </span>
                                                                )
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                size="icon"
                                                                className="h-8 w-8"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
