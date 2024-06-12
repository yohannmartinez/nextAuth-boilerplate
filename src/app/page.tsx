"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();

  console.log(session);

  return (
    <>
      {session.status === "unauthenticated" && (
        <button onClick={() => signIn("google")}>Login</button>
      )}
      {session.status === "authenticated" && (
        <>
          <div>{session?.data?.user?.name}</div>
          <button onClick={() => signOut()}>logout</button>
        </>
      )}
    </>
  );
}
