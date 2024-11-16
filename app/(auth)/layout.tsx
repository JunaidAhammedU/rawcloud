import Image from "next/image";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="bg-brand p-10 hidden w-1/2  items-center justify-center lg:flex xl:w-2/5">
        <div>
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={224}
            height={84}
            className="h-auto"
          />
          <div className="space-y-5 text-white">
            <h1 className="h1"> Manage your files easily and securely</h1>
            <p className="body-1">
              This is a cloud storage app that allows you to manage your files
              easily and securely.
            </p>
            <Image
              src="/assets/images/files.png"
              alt="illustration"
              width={342}
              height={342}
              className="transition-all hover:rotate-2 hover:scale-105"
            />
          </div>
        </div>
      </section>
      {children}
    </div>
  );
};

export default Layout;
