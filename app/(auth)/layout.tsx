import React from "react";
import AuthLayoutClient from "@/components/AuthLayout.client";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50"
      style={{
        backgroundImage: `
          linear-gradient(to bottom right, rgba(59, 130, 246, 0.05), rgba(255, 255, 255, 0.05), rgba(168, 85, 247, 0.05)),
          radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.1) 1px, transparent 0)
        `,
        backgroundSize: "100% 100%, 20px 20px",
      }}
    >
      <AuthLayoutClient>{children}</AuthLayoutClient>
    </div>
  );
};

export default Layout;
