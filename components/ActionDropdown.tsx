"use client";

import React, { act, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Models } from "node-appwrite";
import { actionsDropdownItems } from "@/constants";
import Link from "next/link";
import { constructDownloadUrl } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { set } from "react-hook-form";
import {
  deleteFile,
  renameFile,
  updateFileUsers,
} from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";
import { FileDetails, ShareInput } from "./ActionsModalContent";

const ActionDropdown = ({ file }: { file: Models.Document }) => {
  const path = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [emails, setEmails] = useState<any[]>([]);
  const [actions, setActions] = useState<{
    value: "rename" | "delete" | "details" | "share";
    label: string;
  } | null>(null);
  const [name, setName] = useState(file?.name);
  const [loading, setLoading] = useState(false);

  // Close all modals and dropdowns
  const closeAllModel = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setActions(null);
    setName(file?.name);
  };

  // Handle action
  const handleAction = async () => {
    if (!actions) return;
    setLoading(true);
    let success: any = false;

    const action = {
      rename: async () => {
        return await renameFile({
          fileId: file.$id,
          name: name,
          extension: file.extension,
          path,
        });
      },
      share: async () => {
        return await updateFileUsers({ fileId: file.$id, emails, path });
      },
      delete: async () => {
        return await deleteFile({
          fileId: file.$id,
          bucketFileId: file.bucketFileId,
          path,
        });
      },
      details: async () => {},
    };
    success = await action[actions.value]();

    if (success) closeAllModel();
    setLoading(false);
  };

  // Handle remove user
  const handleRemoveUser = async (email: string) => {
    const updatedEmails = emails.filter((e) => e !== email);
    const response = await updateFileUsers({
      fileId: file.$id,
      emails: updatedEmails,
      path,
    });
    if (response) setEmails(updatedEmails);
    closeAllModel();
  };

  // handle dialog
  const renderDialogContent = () => {
    if (!actions) return null;

    const { value, label } = actions;
    return (
      <DialogContent className="shad-dialog-button">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-light-100">
            {label}
          </DialogTitle>
          {value === "rename" && (
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          {value === "details" && <FileDetails file={file} />}
          {value === "share" && (
            <ShareInput
              file={file}
              onInputChange={setEmails}
              onRemove={handleRemoveUser}
            />
          )}
          {value === "delete" && (
            <DialogDescription className="delete-confirmation">
              Are you sure you want to delete{" "}
              <span className="delete-file-name">{file?.name}</span>
            </DialogDescription>
          )}
        </DialogHeader>
        {["rename", "delete", "share"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row">
            <Button onClick={closeAllModel} className="modal-cancel-button">
              Cancel
            </Button>
            <Button onClick={handleAction} className="modal-submit-button">
              <p className="capitalize">{value}</p>
              {loading && (
                <Image
                  src="/assets/icons/loader.svg"
                  width={24}
                  height={24}
                  className="animate-spin"
                  alt="loading"
                />
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger className="shad-no-focus">
            <Image
              src="/assets/icons/dots.svg"
              alt="More Options"
              width={34}
              height={34}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="max-w-[200px] truncate">
              {file?.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {actionsDropdownItems.map((item: any) => (
              <DropdownMenuItem
                key={item.value}
                className="shad-dropwdown-item"
                onClick={() => {
                  setActions(item);

                  if (
                    ["rename", "delete", "share", "details"].includes(
                      item.value
                    )
                  ) {
                    setIsModalOpen(true);
                  }
                }}
              >
                {item.value === "download" ? (
                  <Link
                    href={constructDownloadUrl(file.bucketFileId)}
                    download={file?.name}
                    className="flex items-center gap-2"
                  >
                    <Image
                      src={item.icon}
                      alt="More Options"
                      width={30}
                      height={30}
                    />{" "}
                    {item.label}
                  </Link>
                ) : (
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.icon}
                      alt="More Options"
                      width={30}
                      height={30}
                    />{" "}
                    {item.label}
                  </div>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {renderDialogContent()}
      </Dialog>
    </>
  );
};

export default ActionDropdown;
