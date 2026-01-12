import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/Components/ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/Components/ui/sidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Link, usePage } from "@inertiajs/react";
import {
    Home,
    User,
    LogOut,
    ChevronUp,
    Database,
    ChevronRight,
    Pill,
    Stethoscope,
    ClipboardList,
    Users,
    FileText,
} from "lucide-react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export function AppSidebar() {
    const user = usePage().props.auth.user;

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <ApplicationLogo className="size-4 fill-current" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">
                                        SIM Klinik PPA BIB
                                    </span>
                                    <span className="">v1.0.0</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={route().current("dashboard")}
                                >
                                    <Link href={route("dashboard")}>
                                        <Home />
                                        <span>Dashboard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <Collapsible
                                asChild
                                defaultOpen={route().current("kunjungan.*")}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip="Kunjungan">
                                            <Stethoscope />
                                            <span>Kunjungan</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={route().current(
                                                        "kunjungan.berobat.index"
                                                    )}
                                                >
                                                    <Link
                                                        href={route(
                                                            "kunjungan.berobat.index"
                                                        )}
                                                    >
                                                        <span>Berobat</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={route().current(
                                                        "kunjungan.follow-up-mcu.index"
                                                    )}
                                                >
                                                    <Link
                                                        href={route(
                                                            "kunjungan.follow-up-mcu.index"
                                                        )}
                                                    >
                                                        <span>
                                                            Follow Up MCU
                                                        </span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={route().current(
                                                        "kunjungan.prolanis.index"
                                                    )}
                                                >
                                                    <Link
                                                        href={route(
                                                            "kunjungan.prolanis.index"
                                                        )}
                                                    >
                                                        <span>Prolanis</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                            <Collapsible
                                asChild
                                defaultOpen={route().current("master.*")}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton tooltip="Master Data">
                                            <Database />
                                            <span>Master Data</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={route().current(
                                                        "master.perusahaan.index"
                                                    )}
                                                >
                                                    <Link
                                                        href={route(
                                                            "master.perusahaan.index"
                                                        )}
                                                    >
                                                        <span>Perusahaan</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={route().current(
                                                        "master.departemen.index"
                                                    )}
                                                >
                                                    <Link
                                                        href={route(
                                                            "master.departemen.index"
                                                        )}
                                                    >
                                                        <span>Departemen</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={route().current(
                                                        "master.jabatan.index"
                                                    )}
                                                >
                                                    <Link
                                                        href={route(
                                                            "master.jabatan.index"
                                                        )}
                                                    >
                                                        <span>Jabatan</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    isActive={route().current(
                                                        "master.karyawan.index"
                                                    )}
                                                >
                                                    <Link
                                                        href={route(
                                                            "master.karyawan.index"
                                                        )}
                                                    >
                                                        <span>Karyawan</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={route().current(
                                        "rekam-medis.index"
                                    )}
                                >
                                    <Link href={route("rekam-medis.index")}>
                                        <ClipboardList />
                                        <span>Rekam Medis</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={route().current("obat.index")}
                                >
                                    <Link href={route("obat.index")}>
                                        <Pill />
                                        <span>Obat & BMHP</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={route().current(
                                        "user-management.index"
                                    )}
                                >
                                    <Link href={route("user-management.index")}>
                                        <Users />
                                        <span>User Management</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={route().current(
                                        "master.icd10.index"
                                    )}
                                >
                                    <Link href={route("master.icd10.index")}>
                                        <FileText />
                                        <span>Diagnosa ICD 10</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage
                                            src={`https://ui-avatars.com/api/?name=${user.name}`}
                                            alt={user.name}
                                        />
                                        <AvatarFallback className="rounded-lg">
                                            CN
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {user.name}
                                        </span>
                                        <span className="truncate text-xs">
                                            {user.email}
                                        </span>
                                    </div>
                                    <ChevronUp className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            >
                                <DropdownMenuItem asChild>
                                    <Link href={route("profile.edit")}>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="w-full"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
