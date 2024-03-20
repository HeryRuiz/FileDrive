"use client";
import { SignInButton, SignOutButton, SignedIn, useSession } from "@clerk/nextjs";

export default function Home() {
  const session = useSession();
  return (
    <>
      <SignedIn>
        <div>You are signed in</div>
        <SignOutButton mode="modal" />
      </SignedIn>
      <div>Always visible</div>
      <SignInButton mode="modal" />
    </>
  );
}
