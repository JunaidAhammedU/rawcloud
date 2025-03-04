import React from "react";
import AuthLayoutClient from "@/components/AuthLayout.client";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <AuthLayoutClient>{children}</AuthLayoutClient>
    </div>
  );
};

export default Layout;
