"use client"

import { UploadDropzone } from "@/lib/uploadthing";

import "@uploadthing/react/styles.css"
import { FileIcon, X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage"
}

export const FileUpload = ({
  onChange, 
  value,
  endpoint
}: FileUploadProps) => {
  let fileUrl = value;
  let fileName = "";
  
  try {
    if (value && value.startsWith('{')) {
      const parsed = JSON.parse(value);
      fileUrl = parsed.url;
      fileName = parsed.name;
    } else {
      fileUrl = value;
      fileName = value;
    }
  } catch {
    fileUrl = value;
    fileName = value;
  }
  
  const fileType = fileName?.split(".").pop()?.toLowerCase();
  
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
          fill
          src={fileUrl}
          alt="Upload"
          className="rounded-full"
        />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm" 
          type="button"
        >
          <X className="h-4 w-4"/>
        </button>
      </div>
    )
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400"/>
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          {fileName}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm" 
          type="button"
        >
          <X className="h-4 w-4"/>
        </button>
      </div>
    )
  }

  return (
    <div className="relative isolate">
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          const file = res?.[0];
          const dataToStore = JSON.stringify({ 
            url: file?.ufsUrl, 
            name: file?.name 
          });
          onChange(dataToStore);
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
      />
    </div>
  )
}