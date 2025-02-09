import OverviewFileCard from "@/components/OverviewFileCard";
import { overViewItems } from "@/constants";

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
