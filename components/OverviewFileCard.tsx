import Link from "next/link";
import React from "react";
import { HiOutlineDocumentText, HiOutlineMusicNote } from "react-icons/hi";
import { FaRegImage } from "react-icons/fa6";
import { RiVideoOnAiFill } from "react-icons/ri";
import { LuAudioLines } from "react-icons/lu";

// dynamic icons
const icons = (key: string, style: string) => {
  switch (key) {
    case "Documents":
      return (
        <div className="p-2 rounded-md flex items-center justify-center w-10 bg-[#3C0366]/75 shadow-sm">
          <HiOutlineDocumentText className={`${style}`} />
        </div>
      );
    case "Images":
      return (
        <div className="p-2 rounded-md flex items-center justify-center w-10 bg-[#C02A4D]/75 shadow-sm">
          <FaRegImage className={`${style} `} />
        </div>
      );
    case "Media":
      return (
        <div className="p-2 rounded-md flex items-center justify-center w-10 bg-[#F5501D]/75 shadow-sm">
          <RiVideoOnAiFill className={`${style} `} />
        </div>
      );
    case "Others":
      return (
        <div className="p-2 rounded-md flex items-center justify-center w-10 bg-[#F5A83B]/75 shadow-sm">
          <LuAudioLines className={`${style} `} />
        </div>
      );

    default:
      return null;
  }
};

const OverviewFileCard = ({ items }: { items: any }) => {
  return (
    <Link href={items?.url} className="block w-full">
      <div className="w-full flex gap-5 items-center font-semibold bg-white  rounded-lg p-2 shadow-sm">
        {icons(items.name, "text-white text-2xl text-white")}
        <div>
          <span>{items?.name}</span>
          <p className="text-[12px] text-gray-400">124 Files</p>
        </div>
      </div>
    </Link>
  );
};

export default OverviewFileCard;
