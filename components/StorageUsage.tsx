import React from "react";
import { Progress } from "@/components/ui/progress";

interface StorageUsageProps {
  used?: number; // used space in GB
  total?: number; // total space in GB
}

const StorageUsage: React.FC<StorageUsageProps> = ({
  used = 20, // default used value in GB
  total = 100, // default total value in GB
}) => {
  const percentUsed = total === 0 ? 0 : (used / total) * 100;
  return (
    <div className="flex flex-col gap-2 p-2">
      <h2 className="text-lg font-semibold">Storage</h2>
      <p>
        {used} GB used out of {total} GB
      </p>
      <Progress value={percentUsed} />
    </div>
  );
};

export default StorageUsage;
