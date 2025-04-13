import { redirect } from "next/navigation";
import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import { getCurrentUser } from "@/lib/actions/user.action";
import { Toaster } from "@/components/ui/toaster";
export const dynamic = "force-dynamic";

// This layout is used for the root
const layout = async ({ children }: { children: React.ReactNode }) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return redirect("/sign-in");
    }

    return (
      <main className="flex h-screen">
        <Sidebar {...currentUser} />
        <section className="flex h-full flex-1 flex-col">
          <MobileNavigation {...currentUser} />
          <Header
            userId={currentUser.$id}
            accountId={currentUser.accountId}
            hideSearch={"/"}
          />
          <div className="main-content">{children}</div>
        </section>
        <Toaster />
      </main>
    );
  } catch (error) {
    return redirect("/sign-in");
  }
};

export default layout;
