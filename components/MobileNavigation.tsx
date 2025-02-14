"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
import { navItems } from "@/constants";
import Link from "next/link";
import { cn, formatStorageSize } from "@/lib/utils";
import { Button } from "./ui/button";
import FileUploader from "./FileUploader";
import { signOutUser } from "@/lib/actions/user.action";
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});
import { Outfit } from "next/font/google";
import StorageUsage from "./StorageUsage";
import { getStorageUsage } from "@/lib/actions/file.actions";
interface Props {
  $id: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

const MobileNavigation = ({
  $id: ownerId,
  accountId,
  fullName,
  email,
}: Props) => {
  const [open, setOpen] = useState(false);
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
    <header className="mobile-header">
      <div className="flex gap-1 items-center">
        <Image
          src="/assets/images/rawCloud.png"
          alt="logo"
          width={62}
          height={32}
          className="object-cover"
        />
        <h1 className={`${outfit.variable} text-lg font-semibold`}>
          Raw cloud
        </h1>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="Search"
            width={30}
            height={30}
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="header-user">
              <Image
                src="/assets/images/avatar.png"
                alt="avatar"
                width={44}
                height={44}
                className="header-user-avatar"
              />
              <div className="sm:hidden lg:block">
                <p className="subtitle-2 capitalize">{fullName}</p>
                <p className="caption">{email}</p>
              </div>
            </div>
          </SheetTitle>
          <Separator className="mb-4 bg-light-200/20 " />
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ url, name, icon }) => {
                const active = pathName === url;
                return (
                  <Link href={url} key={name} className="lg:w-full">
                    <li
                      className={cn(
                        "mobile-nav-item",
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
                      <p>{name}</p>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </nav>
          <Separator className=" bg-light-200/20 " />
          <StorageUsage used={formatStorageSize(usage?.storageUsage) || 0} />

          <div className="flex flex-col justify-between gap-5">
            <div className="mt-2 bg-red flex items-center">
              <FileUploader ownerId={ownerId} accountId={accountId} />
            </div>
            <Button
              type="submit"
              className="mobile-sign-out-button"
              onClick={async () => await signOutUser()}
            >
              <Image
                src="/assets/icons/logout.svg"
                alt="logout"
                width={24}
                height={24}
                className="w-6"
              />
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
