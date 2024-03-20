"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, SignedIn } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
const createFiles = useMutation(api.files.createFiles)
const files = useQuery(api.files.getFiles)

  return (
    <>
      <SignedIn>
        <div>You are signed in</div>
        <SignOutButton mode="modal" />
      </SignedIn>
      <div>Always visible</div>
      <SignInButton mode="modal" />
      <Button onClick={()=>createFiles({
        name: "hello",
      })}>send</Button>
      {
        files?.map(file => {
          return <div key={file.id}>{file.name}</div>
        })
      }

    </>
  );
}
