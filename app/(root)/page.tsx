import OverviewFileCard from "@/components/OverviewFileCard";
import { overViewItems } from "@/constants";
import Search from "@/components/Search";

export default async function Home() {
  return (
    <>
      <div className="h-screen">
        <div className="">
          <section className="file-list">
            {overViewItems.map((item: any) => (
              <OverviewFileCard key={item.url} items={item} />
            ))}
          </section>
        </div>
      </div>
    </>
  );
}
