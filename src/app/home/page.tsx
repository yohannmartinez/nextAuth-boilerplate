"use client";

import { signOut } from "next-auth/react";

export default function Page() {
  return (
    <div>
      home <button onClick={() => signOut()}>logout</button>
    </div>
  );
}
