"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, SignedIn } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
const createFile = useMutation(api.files.createFile)
  return (
    <>
      <SignedIn>
        <div>You are signed in</div>
        <SignOutButton mode="modal" />
      </SignedIn>
      <div>Always visible</div>
      <SignInButton mode="modal" />

      <Button onClick={()=>createFile({
        name: "hello",
      })}></Button>
    </>
  );
}
