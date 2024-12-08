import { Command, CommandItem, CommandList } from "@/components/shared/ui";
import { SIDEBAR_ELEMENTS } from "../lib/constants";
import Image from "next/image";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <div className={`w-[92px] px-4 py-10 sm:w-[300px]`}>
      <div className="flex h-full flex-col">
        <Link href="/">
          <div className="flex flex-col items-center gap-2 sm:flex-row">
            <Image
              src="https://utfs.io/f/10eeb70a-84b1-4991-9621-0d2fdacd5ef4-hru0oc.png"
              width={60}
              height={60}
              alt="NUFL Logo"
              className="h-[60px] w-[60px]"
            />
            <h1 className="text-center text-[20px] font-bold">NUFL Panel</h1>
          </div>
        </Link>

        <Command className="flex flex-1 grow pt-6">
          <CommandList>
            <div className="flex flex-col gap-3 sm:gap-1">
              {SIDEBAR_ELEMENTS.map((command) => (
                <Link
                  href={"/" + command.id}
                  key={command.id}
                  className="flex flex-row items-center justify-center gap-1 rounded-xl px-2 py-0.5 transition ease-in-out hover:bg-[#8c6c34]/45 sm:justify-normal"
                >
                  {command.icon}
                  <CommandItem className="hidden text-[16px] sm:block">
                    {command.name}
                  </CommandItem>
                </Link>
              ))}
            </div>
          </CommandList>
        </Command>
      </div>
    </div>
  );
};
