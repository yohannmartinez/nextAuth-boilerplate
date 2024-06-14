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
import Age from "./age";

export default function Page() {
  const { data: session } = useSession();
  const { state, uploadImage } = useFirebaseImageUpload();
  const [step, setStep] = useState<number>(0);
  const [isUploadLoading, setIsUploadLoading] = useState<boolean>(false);
  const [hasUploadImage, setHasUploadImage] = useState<boolean>(false);
  const isLookingTutorial = step + 1 <= steps.length;

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
        setHasUploadImage(true);
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
      {isLookingTutorial && <Rules step={step} setStep={setStep} />}

      {!isLookingTutorial && !hasUploadImage && (
        <MomentCapture
          handleImageUpload={handleImageUpload}
          isUploadLoading={isUploadLoading}
        />
      )}

      {!isLookingTutorial && hasUploadImage && (
        <Age userId={session?.user.id} email={session?.user.email} />
      )}
    </Flex>
  );
}
