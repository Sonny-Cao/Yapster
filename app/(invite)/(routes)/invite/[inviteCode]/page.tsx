import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: Promise<{
    inviteCode: string;
  }>;
}

const InviteCodePage = async (props: InviteCodePageProps) => {
  const profile = await currentProfile();

  console.log("Profile:", profile);

  if (!profile) {
    return <RedirectToSignIn/>
  }

  const params = await props.params;
  const inviteCode = params.inviteCode;


  if (!inviteCode) {
    return redirect("/");
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }


  try {
    const server = await db.server.update({
      where: {
        inviteCode: inviteCode,
      },
      data: {
        members: {
          create: {
            profileId: profile.id,
          }
        }
      }
    });

    if (server) {
      return redirect(`/servers/${server.id}`);
    }
  } catch (error) {
    console.error("Error updating server:", error);
    return redirect("/");
  }

  return null;
}

export default InviteCodePage;