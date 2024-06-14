"use client";

import { db } from "@/lib/firebase";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import LoadingScreen from "@/components/loadingScreen";
import ErrorScreen from "@/components/errorScreen";
import { useRouter } from "next/navigation";
import { User } from "../../../types/user";

export default function Page(): React.ReactNode | void {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isThereError, setIsThereError] = useState<Boolean>(false);

  useEffect(() => {
    (async () => {
      if (session) {
        try {
          const snap = await getDoc(doc(db, "users", session.user.id));
          const data = snap.data() as User | undefined;
          if (snap.exists()) {
            setUser(data);
          } else {
            setIsThereError(true);
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
          setIsThereError(true);
        }
      }
    })();
  }, [session]);

  if (status === "loading" || !user) return <LoadingScreen />;

  if (status === "authenticated" && isThereError) return <ErrorScreen />;

  if (user && (!user?.age || !user?.picture || !user?.planetId))
    return router.push("/rules");

  if (user)
    return (
      <div>
        fee <button onClick={() => signOut()}>logout</button>
      </div>
    );
}
