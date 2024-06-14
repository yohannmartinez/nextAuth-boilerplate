"use client";
import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";

import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <Provider>
      <Theme appearance="light" grayColor="olive">
        {children}
      </Theme>
    </Provider>
  );
}
