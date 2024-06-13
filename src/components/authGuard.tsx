"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import routes from "@/lib/routes";
import { Session } from "next-auth";

/**
 * Prevent page rendering if user ins't authenticated
 */
export default function AuthGuard({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const { data: status }: any = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const isAuthenticatedRoute = !!routes.authenticated.find(
      (route) => route === pathname
    );
    const isUnauthenticatedRoute = !!routes.unauthenticated.find(
      (route) => route === pathname
    );
    const isUserAuthenticated = session;
    setLoading(true);

    if (status === "loading") {
      return;
    } else if (isUserAuthenticated && isUnauthenticatedRoute) {
      router.push("/home");
    } else if (!isUserAuthenticated && isAuthenticatedRoute) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [pathname, status]);

  return loading ? <div>Loading...</div> : <>{children}</>;
}
