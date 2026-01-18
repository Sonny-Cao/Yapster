import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();
const handleAuth = async () => {
  const session = await auth();
  if (!session.userId) throw new Error("Unauthorized");
  return {userId: session.userId};
}

export const ourFileRouter = {
  serverImage: f({image: { maxFileSize: "4MB", maxFileCount: 1}})
    .middleware(async() => await handleAuth())
    .onUploadComplete(() => {}),
  messageFile: f(["image", "pdf"])
    .middleware(async() => await handleAuth())
    .onUploadComplete(() => {})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
