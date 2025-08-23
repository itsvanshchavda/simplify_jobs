"use client"

import { Briefcase, ChevronDown, FileText, Home, Mail, Settings, User } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useEffect, useState } from "react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Logo from "@/public/icons/logo"
import { usePathname } from "next/navigation"

// Menu items
const items = [
    {
        title: "Dashboard",
        url: "#",
        icon: Home,
    },
    {
        title: "Documents",
        url: "/dashboard/documents",
        icon: FileText,

    },
    {
        title: "Cover Letters",
        url: "#",
        icon: Mail,
        subItems: [
            { title: "Saved Letters", url: "#" },
            { title: "Generate Letter", url: "#" },
        ],
    },
    {
        title: "Job Applications",
        url: "#",
        icon: Briefcase,
        subItems: [
            { title: "Job Tracker", url: "#" },
            { title: "Follow-up Mails", url: "#" },
            { title: "Mock Interview", url: "#" },
        ],
    },
    {
        title: "Profile",
        url: "#",
        icon: User,
        subItems: [
            { title: "My Profile", url: "#" },
            { title: "Account Settings", url: "#" },
        ],
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export function AppSidebar() {
    const [openIndex, setOpenIndex] = useState(null)

    const toggle = (idx) => {
        setOpenIndex(openIndex === idx ? null : idx)
    }

    const [active, setActive] = useState(null)
    const pathname = usePathname()


    return (
        <Sidebar>
            <SidebarContent className="w-full bg-white p-2">
                <SidebarHeader>
                    <Logo />
                </SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupContent className="font-circular text-sm pt-4">
                        <SidebarMenu>
                            {items.map((item, idx) => (
                                <SidebarMenuItem key={idx}>
                                    {item.subItems ? (
                                        <>
                                            <SidebarMenuButton
                                                onClick={() => toggle(idx)}
                                                className={`flex  items-center py-6 gap-3 justify-between w-full hover:bg-gray-100 rounded-xl transition-colors`}
                                                tooltip={item.title}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <item.icon className="!size-5 text-gray-700" />
                                                    <span className="text-[15px]">{item.title}</span>
                                                </div>
                                                <motion.div
                                                    animate={{ rotate: openIndex === idx ? 180 : 0 }}
                                                    transition={{ duration: 0.25 }}
                                                >
                                                    <ChevronDown strokeWidth={1.4} className="text-gray-600" />
                                                </motion.div>
                                            </SidebarMenuButton>

                                            <AnimatePresence initial={false}>
                                                {openIndex === idx && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                                    >
                                                        <SidebarMenuSub className="pl-8 text-[15px]">
                                                            {item.subItems.map((sub, subIdx) => (
                                                                <SidebarMenuSubItem
                                                                    key={subIdx}
                                                                    className="py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                                                >
                                                                    <a href={sub.url}>{sub.title}</a>
                                                                </SidebarMenuSubItem>
                                                            ))}
                                                        </SidebarMenuSub>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </>
                                    ) : (
                                        <SidebarMenuButton
                                            className={`py-6 ${pathname === "/dashboard" && item.title === "Dashboard" ? "bg-white  border border-gray-200" : ""} flex items-center gap-3 hover:bg-gray-100 rounded-xl transition-colors`}
                                            tooltip={item.title}
                                        >
                                            <a href={item.url} className="flex gap-3 items-center w-full">
                                                <item.icon className="!size-5 text-gray-700" />
                                                <span className="text-[15px]">{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
