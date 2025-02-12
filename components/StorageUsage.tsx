"use client";

import React from "react";
import { Progress } from "@/components/ui/progress";
import { IoCloudOutline } from "react-icons/io5";

interface StorageUsageProps {
  used?: number;
  total?: number;
}

const formatSize = (sizeInMB: number) => {
  if (sizeInMB < 1024) {
    return `${sizeInMB} MB`;
  } else {
    return `${(sizeInMB / 1024).toFixed(2)} GB`;
  }
};

const StorageUsage: React.FC<StorageUsageProps> = ({ used = 0 }) => {
  let total = 2048;
  const percentUsed = total === 0 ? 0 : (used / total) * 100;
  return (
    <div className="flex flex-col gap-2 p-2 bg-gray-100 rounded-md px-6">
      <div className="flex items-center gap-2">
        <IoCloudOutline className="text-2xl" />
        <h2 className="text-lg font-semibold">Storage</h2>
      </div>
      <p className="text-sm">
        <span className="font-bold">{formatSize(used)}</span> used out of{" "}
        <span className="font-bold">{formatSize(total)}</span>
      </p>
      <Progress className="bg-gray-400" value={percentUsed} />
    </div>
  );
};

export default StorageUsage;
