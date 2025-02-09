import Link from "next/link";
import { Models } from "node-appwrite";
import React from "react";
import Thumbnail from "./Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "./FormattedDateTime";
import ActionDropdown from "./ActionDropdown";

const OverviewFileCard = ({ items }: { items: any }) => {
  return (
    <Link
      href={items?.url}
      target="_blank"
      rel="noreferrer noopener"
      className={`w-full bg-[#815a1a]`}
    >
      <div className="flex justify-between">
        <img src={items?.icon} alt="" />
      </div>
    </Link>
  );
};

export default OverviewFileCard;
