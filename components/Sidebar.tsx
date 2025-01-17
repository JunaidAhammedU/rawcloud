"use client";

import { avatarPlaceholderUrl, navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <aside className="sidebar">
      <Link href="#" className="sidebar">
        <Image
          src="/accets/icons/logo-full-brand.svg"
          alt="logo"
          width={160}
          height={50}
          className="hidden h-auto md:block"
        />

        <Image
          src="/accets/icons/logo-brand.svg"
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
        <Image
          src="/assets/images/files-2.png"
          alt="filelogo"
          width={506}
          height={418}
          className="w-full"
        />
        <div className="sidebar-user-info">
          <Image
            src={avatarPlaceholderUrl}
            alt="avatar"
            width={44}
            height={44}
            className="sidebar-user-avatar"
          />
        </div>
      </Link>
    </aside>
  );
};

export default Sidebar;
