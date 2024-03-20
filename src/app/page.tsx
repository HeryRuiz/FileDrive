"use client";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  useOrganization,
  useUser,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();
  let orgId: string | undefined = undefined;
  if(organization.isLoaded && user.isLoaded ){
    orgId = organization.organization?.id ?? user.user?.id;
  }
  const createFiles = useMutation(api.files.createFiles);
  const files = useQuery(
    api.files.getFiles,
    orgId ? {orgId} : 'skip'
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button
        onClick={() => {
          if (!orgId) {
            return;
          }
          createFiles({
            name: "org",
            orgId,
          });
        }}
      >
        dwaawd
      </Button>

      {files?.map((file) => {
       return  <div key={file._id}>{file.name}</div>;
      })}
      <SignInButton>addw</SignInButton>
    </main>
  );
}
