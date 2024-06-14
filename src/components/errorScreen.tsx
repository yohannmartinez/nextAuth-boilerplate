import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function ErrorScreen() {
  const router = useRouter();
  return (
    <Flex
      direction={"column"}
      align={"center"}
      justify={"center"}
      minHeight={"100vh"}
    >
      <Box maxWidth={"400px"}>
        <Flex direction={"column"} align={"center"}>
          <Heading size={"8"} align={"center"} highContrast mb={"6"}>
            Quelque chose ne s'est pas bien passé
          </Heading>
          <Button onClick={() => router.refresh()}>Recharger la page</Button>
        </Flex>
      </Box>
    </Flex>
  );
}
