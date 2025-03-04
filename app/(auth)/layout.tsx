import Image from "next/image";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-20 top-20 h-40 w-40 animate-float rounded-full bg-blue-100/30 blur-3xl" />
        <div className="absolute right-20 top-40 h-32 w-32 animate-float-delay rounded-full bg-purple-100/30 blur-3xl" />
        <div className="absolute bottom-20 left-1/3 h-36 w-36 animate-float rounded-full bg-pink-100/30 blur-3xl" />
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/assets/patterns/grid.svg')] opacity-5" />

      {/* Main content */}
      <div className="relative flex min-h-screen w-full items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo and brand */}
          <div className="mb-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 animate-pulse rounded-full bg-brand/10" />
                <Image
                  src="/assets/icons/logo-full.svg"
                  alt="Raw Cloud"
                  width={160}
                  height={50}
                  className="relative"
                />
              </div>
            </div>
            <h2 className="flex items-center justify-center gap-2 text-xl font-medium text-gray-600">
              <Image
                src="/assets/icons/cloud-secure.svg"
                alt="secure"
                width={24}
                height={24}
                className="animate-bounce"
              />
              Secure Cloud Storage
            </h2>
          </div>

          {/* Form container */}
          <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl">
            <div className="absolute inset-0 bg-white/80" />
            <div className="relative p-8">
              {/* Decorative corners */}
              <div className="absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 border-brand/20" />
              <div className="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-brand/20" />

              {children}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
            <a href="#" className="hover:text-brand">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-brand">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
