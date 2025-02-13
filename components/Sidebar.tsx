"use client";

import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});
import React, { useEffect, useState } from "react";
import { Outfit } from "next/font/google";
import StorageUsage from "./StorageUsage";
import { formatStorageSize } from "@/lib/utils";
import { getStorageUsage } from "@/lib/actions/file.actions";

interface Props {
  fullName: string;
  avatar: string;
  email: string;
}

const Sidebar = ({ fullName, avatar, email }: Props) => {
  const pathName = usePathname();
  const [usage, setUsage] = useState<any>(null);

  useEffect(() => {
    async function fetchStorageUsage() {
      const data = await getStorageUsage();
      setUsage(data);
    }
    fetchStorageUsage();
  }, [fullName, email]);

  return (
    <aside className="h-screen sticky top-0 overflow-hidden">
      <Link href="#" className="sidebar">
        <div className="flex gap-5 items-center">
          <Image
            src="/assets/images/rawCloud.png"
            alt="logo"
            width={100}
            height={100}
            className="hidden h-auto md:block"
          />
          <h1 className={`${outfit.variable} text-2xl font-semibold`}>
            Raw cloud
          </h1>
        </div>
        <Image
          src="/assets/images/rawCloud.png"
          alt="logo"
          width={52}
          height={52}
          className="lg:hidden"
        />

        <nav className="sidebar-nav">
          <ul className="flex fle-1 flex-col gap-6">
            {navItems.map(({ url, name, icon }) => {
              const active = pathName === url;
              return (
                <Link href={url} key={name} className="lg:w-full">
                  <li
                    className={cn(
                      "sidebar-nav-item",
                      pathName === url && "shad-active"
                    )}
                  >
                    <Image
                      src={icon}
                      alt={name}
                      width={24}
                      height={24}
                      className={cn(
                        "nav-icon",
                        pathName === url && "nav-icon-active"
                      )}
                    />
                    <p className="hidden lg:block">{name}</p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </nav>
        <StorageUsage used={formatStorageSize(usage?.storageUsage) || 0} />
        <div className="sidebar-user-info">
          <Image
            src="/assets/images/avatar.png"
            alt="filelogo"
            width={44}
            height={44}
            className="rounded-full"
          />
          <div className="hidden lg:block">
            <p className="subtitle-2 capitalize ">{fullName}</p>
            <p className="caption">{email}</p>
          </div>
        </div>
      </Link>
    </aside>
  );
};

export default Sidebar;
