import Camera from "@/components/camera";
import { Box, Heading, Text } from "@radix-ui/themes";

export default function MomentCapture({
  handleImageUpload,
  isUploadLoading,
}: {
  handleImageUpload: (imageSrc: string) => Promise<void>;
  isUploadLoading: boolean;
}) {
  return (
    <>
      <Box maxWidth={"400px"}>
        <Heading mb={"3"} align={"center"}>
          Ouististiiii 📸
        </Heading>
        <Text mb={"7"} as={"div"} align={"center"}>
          Soyez inventifs, les photos serviront dans le jeu (promis on les
          revend pas aux GAFA)
        </Text>
      </Box>

      <Camera uploadImage={handleImageUpload} isUploading={isUploadLoading} />
    </>
  );
}
