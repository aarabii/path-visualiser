"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, BarChart3, Home } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Pathfinding", href: "/pathfinding", icon: Activity },
    { name: "Sorting", href: "/sorting", icon: BarChart3 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 transition-transform group-hover:scale-105">
              <Image src="/logo.svg" alt="AlgoViz Logo" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold text-[var(--foreground)] tracking-tight">
              AlgoViz
            </span>
          </Link>

          <div className="flex gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? "bg-[var(--hover-bg)] text-[var(--foreground)] shadow-sm border border-[var(--card-border)]"
                        : "text-[var(--secondary)] hover:text-[var(--foreground)] hover:bg-[var(--hover-bg)]"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:block">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
