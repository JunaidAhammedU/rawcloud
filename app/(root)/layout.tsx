import { redirect } from "next/navigation";
import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import { getCurrentUser } from "@/lib/actions/user.action";

const layout = async ({ children }: { children: React.ReactNode }) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) redirect("/sign-in");
  } catch (error) {
    redirect("/sign-in");
  }

  return (
    <main className="flex h-screen">
      <Sidebar />
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation /> <Header />
        <div className="main-content">{children}</div>
      </section>
    </main>
  );
};

export default layout;
