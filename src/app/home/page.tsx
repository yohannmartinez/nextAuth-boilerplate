"use client";

import { db } from "@/lib/firebase";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { DocumentData } from "firebase-admin/firestore";
import LoadingScreen from "@/components/loadingScreen";
import ErrorScreen from "@/components/errorScreen";
import { useRouter } from "next/navigation";

export default function Page(): React.ReactNode | void {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState<DocumentData | undefined>(undefined);
  const [isThereError, setIsThereError] = useState<Boolean>(false);

  useEffect(() => {
    (async () => {
      if (session) {
        const snap = await getDoc(doc(db, "users", session.user.id));
        const data = snap.data();
        console.log(snap.exists());
        return snap.exists() ? setUser(data) : setIsThereError(true);
      }
    })();
  }, []);

  if (status === "loading") return <LoadingScreen />;

  if (status === "authenticated" && isThereError) return <ErrorScreen />;

  if (!user?.age || !user?.picture) return router.push("/rules");

  if (user)
    return (
      <div>
        fee <button onClick={() => signOut()}>logout</button>
      </div>
    );
}
