'use client'
import { AppSidebar } from "@/components/app-sidebar"
import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
export default function Page({ children }) {

    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(Boolean);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex z-10 h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            {pathSegments.map((segment, index) => {
                                const href = '/' + pathSegments.slice(0, index + 1).join('/');
                                const isLast = index === pathSegments.length - 1;

                                return (
                                    <div className="flex items-center gap-1" key={href}>
                                        <BreadcrumbItem>
                                            {isLast ? (
                                                <BreadcrumbPage className="capitalize">{decodeURIComponent(segment)}</BreadcrumbPage>
                                            ) : (
                                                <BreadcrumbLink asChild>
                                                    <Link href={href} className="capitalize">
                                                        {decodeURIComponent(segment)}
                                                    </Link>
                                                </BreadcrumbLink>
                                            )}
                                        </BreadcrumbItem>
                                        {!isLast && <BreadcrumbSeparator />}
                                    </div>
                                );
                            })}
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <section className="flex flex-1 flex-col gap-4 p-4">
                    {children}
                </section>
            </SidebarInset>
        </SidebarProvider>
    );
}
