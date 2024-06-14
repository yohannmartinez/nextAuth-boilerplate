"use client";
import { Box, Button, Spinner } from "@radix-ui/themes";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 720,
  height: 720,
};

export default function Camera({
  uploadImage,
  isUploading,
}: {
  uploadImage: (imageSrc: string) => Promise<void>;
  isUploading: boolean;
}) {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      uploadImage(imageSrc);
    }
  }, [webcamRef]);

  return (
    <>
      <Box
        mb={"7"}
        width={"360px"}
        height={"360px"}
        style={{
          borderRadius: "30px",
          overflow: "hidden",
          border: "5px solid #3358D3",
        }}
      >
        <Webcam
          audio={false}
          width={360}
          height={360}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          mirrored
          videoConstraints={videoConstraints}
        />
      </Box>
      <Button onClick={capture}>
        {isUploading ? <Spinner /> : "Faire une photo"}
      </Button>
    </>
  );
}
