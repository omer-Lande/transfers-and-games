"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRightLeft, History, Gamepad2, Menu, X, Rocket } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: "Transfer Tracker", href: "/", icon: <ArrowRightLeft className="w-5 h-5" /> },
        { name: "On This Day", href: "/history", icon: <History className="w-5 h-5" /> },
        { name: "Tiki-Taka-Toe", href: "/game", icon: <Gamepad2 className="w-5 h-5" /> },
    ];

    return (
        <>
            {/* Mobile Toggle */}
            <button
                className="md:hidden fixed top-4 right-4 z-50 p-2 bg-zinc-800 text-white rounded-md shadow-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Sidebar Overlay */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Content */}
            <div className={`fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-50 w-72 bg-zinc-950 text-white min-h-screen border-r border-white/5 flex flex-col shadow-2xl md:shadow-none`}>
                <div className="p-8 pb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Rocket className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="font-extrabold text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
                            Tiki-Transfer
                        </h1>
                    </div>
                </div>

                <div className="px-6 pb-4">
                    <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent"></div>
                </div>

                <nav className="flex-1 px-4 space-y-2 relative">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                                        ? "text-white font-medium shadow-sm"
                                        : "text-zinc-400 hover:text-white"
                                    }`}
                            >
                                {isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 opacity-100 transition-opacity"></div>
                                )}
                                {!isActive && (
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                )}

                                {/* Active Indicator Line */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-emerald-400 rounded-r-full"></div>
                                )}

                                <div className={`relative z-10 transition-transform duration-200 ${isActive ? "text-emerald-400" : "group-hover:scale-110 group-hover:text-cyan-400"}`}>
                                    {link.icon}
                                </div>
                                <span className="relative z-10">{link.name}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-6">
                    <div className="bg-white/5 rounded-2xl p-4 text-xs text-zinc-500 text-center font-medium border border-white/5">
                        Powered by Football-Data.org
                    </div>
                </div>
            </div>
        </>
    );
}
