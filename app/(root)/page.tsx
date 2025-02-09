import OverviewFileCard from "@/components/OverviewFileCard";
import { navItems, overViewItems } from "@/constants";
import { getFile } from "@/lib/actions/file.actions";
import { getFileTypesParams } from "@/lib/utils";
import Image from "next/image";
import { Models } from "node-appwrite";

export default async function Home() {
  const files = await getFile({ types: [] });
  return (
    <>
      <div className="h-screen">
        <div className="">
          {files.total > 0 ? (
            <section className="file-list">
              {overViewItems.map((item: any) => (
                <OverviewFileCard key={item.url} items={item} />
              ))}
            </section>
          ) : (
            <p className="empty-list">No File uploaded</p>
          )}
        </div>
      </div>
    </>
  );
}
