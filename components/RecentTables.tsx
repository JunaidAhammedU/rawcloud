import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";

const RecentTables = ({ data }: { data: any }) => {
  return (
    <Table className="bg-white rounded-lg shadow-sm overflow-auto">
      <TableHeader>
        <TableRow>
          <TableHead className="text-start font-semibold text-black px-3 ">
            Name
          </TableHead>
          <TableHead className="text-center font-semibold text-black px-3">
            Owner
          </TableHead>
          <TableHead className="text-right font-semibold text-black px-3">
            Created
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.documents?.map((item: any) => (
          <TableRow key={item.id}>
            <TableCell className="text-start flex items-center gap-2">
              <Thumbnail
                type={item?.type}
                extension={item?.extension}
                url={item?.url}
                className=""
                imageClassName="!size-11"
              />
              {item.name}
            </TableCell>
            <TableCell className="text-center">{item.owner.fullName}</TableCell>
            <TableCell className="text-right">
              <FormattedDateTime
                date={item.owner.$createdAt}
                className="body-2 text-light-100"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentTables;
