"use client";

import { usePathname } from "next/navigation";

import { Button } from "@/components/shared/ui";
import { cn } from "@/components/shared/lib/utils/clsx";
import Link from "next/link";
import { MOBILE_NAV_ELEMENTS } from "../lib/constants";

export default function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-background fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t-[1px] border-white/30 px-4 backdrop-blur-lg md:hidden">
      {MOBILE_NAV_ELEMENTS.map((item) => {
        const isActive = pathname === `/${item.id}`;

        return (
          <Button
            key={item.id}
            asChild
            variant="ghost"
            className={cn(
              "flex h-12 flex-col items-center justify-center gap-1 p-0",
              isActive && "text-primary",
            )}
          >
            <Link href={`/${item.id}`}>
              {item.icon}
              <span className="text-xs font-normal">{item.name}</span>
              <span className="sr-only">{item.name}</span>
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
