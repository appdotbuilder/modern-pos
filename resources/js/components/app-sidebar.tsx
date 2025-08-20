import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, ShoppingCart, Users, Package, Tags, Calculator, Truck, FileText, BarChart3, Settings } from 'lucide-react';
import AppLogo from './app-logo';

// Role-based navigation items
const getNavItemsForRole = (role: string): NavItem[] => {
    const baseItems = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
    ];

    if (role === 'administrator') {
        return [
            ...baseItems,
            {
                title: 'Sales',
                href: '/sales',
                icon: ShoppingCart,
            },
            {
                title: 'Tax Management',
                href: '/taxes',
                icon: Calculator,
            },
            {
                title: 'Categories',
                href: '/categories',
                icon: Tags,
            },
            {
                title: 'Products',
                href: '/products',
                icon: Package,
            },
            {
                title: 'Units',
                href: '/units',
                icon: Settings,
            },
            {
                title: 'Suppliers',
                href: '/suppliers',
                icon: Truck,
            },
            {
                title: 'Customers',
                href: '/customers',
                icon: Users,
            },
            {
                title: 'Invoices',
                href: '/invoices',
                icon: FileText,
            },
            {
                title: 'Reports',
                href: '/reports',
                icon: BarChart3,
            },
        ];
    }

    if (role === 'cashier') {
        return [
            ...baseItems,
            {
                title: 'Sales',
                href: '/sales',
                icon: ShoppingCart,
            },
        ];
    }

    if (role === 'manager') {
        return [
            ...baseItems,
            {
                title: 'Tax Info',
                href: '/taxes',
                icon: Calculator,
            },
            {
                title: 'Categories',
                href: '/categories',
                icon: Tags,
            },
            {
                title: 'Products',
                href: '/products',
                icon: Package,
            },
            {
                title: 'Units',
                href: '/units',
                icon: Settings,
            },
            {
                title: 'Invoices',
                href: '/invoices',
                icon: FileText,
            },
            {
                title: 'Reports',
                href: '/reports',
                icon: BarChart3,
            },
        ];
    }

    return baseItems;
};

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user?.role || 'cashier';
    const mainNavItems = getNavItemsForRole(userRole);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
