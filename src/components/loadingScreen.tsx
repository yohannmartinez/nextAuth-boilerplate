import { Flex, Heading, Spinner } from "@radix-ui/themes";

export default function LoadingScreen() {
  return (
    <Flex
      direction={"column"}
      align={"center"}
      justify={"center"}
      minHeight={"100vh"}
    >
      <Heading size={"9"} align={"center"} highContrast mb={"5"}>
        StarQuiz
      </Heading>
      <Spinner />
    </Flex>
  );
}
