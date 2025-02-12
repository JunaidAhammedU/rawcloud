import OverviewFileCard from "@/components/OverviewFileCard";
import RecentTables from "@/components/RecentTables";
import { overViewItems } from "@/constants";
import { getRecentFiles, getStorageUsage } from "@/lib/actions/file.actions";

export default async function Home() {
  const data: any = await getRecentFiles(10);
  return (
    <>
      <div className="h-screen">
        <div className="">
          <section className="file-list">
            {overViewItems.map((item: any) => (
              <OverviewFileCard key={item.url} items={item} />
            ))}
          </section>
          <section className="file-list-table">
            <h1 className="text-xl font-semibold py-2">Recent Files</h1>
            <RecentTables data={data} />
          </section>
        </div>
      </div>
    </>
  );
}
