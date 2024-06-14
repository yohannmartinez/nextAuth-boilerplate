"use client";
import { Flex } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";

import useFirebaseImageUpload from "../../../hooks/useFirebaseImageUpload";
import { db } from "@/lib/firebase";

import steps from "./steps";
import Rules from "./rules";
import MomentCapture from "./momentCapture";

export default function Page() {
  const { data: session } = useSession();
  const { state, uploadImage } = useFirebaseImageUpload();
  const [step, setStep] = useState<number>(0);
  const [isUploadLoading, setIsUploadLoading] = useState<boolean>(false);

  const handleImageUpload = async (imageSrc: string): Promise<void> => {
    setIsUploadLoading(true);
    uploadImage(imageSrc);
  };

  useEffect(() => {
    (async () => {
      if (state.url && session) {
        const userDocRef = doc(db, "users", session?.user.id);

        await updateDoc(userDocRef, {
          picture: state.url,
        });
        setIsUploadLoading(false);
      }
    })();
  }, [state, session]);

  return (
    <Flex
      direction={"column"}
      align={"center"}
      justify={"center"}
      minHeight={"100vh"}
    >
      {step + 1 <= steps.length && <Rules step={step} setStep={setStep} />}

      {step + 1 > steps.length && (
        <MomentCapture
          handleImageUpload={handleImageUpload}
          isUploadLoading={isUploadLoading}
        />
      )}
    </Flex>
  );
}
