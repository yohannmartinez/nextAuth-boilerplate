import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import steps from "./steps";
import { Dispatch, SetStateAction } from "react";

export default function Rules({
  step,
  setStep,
}: {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}) {
  return (
    <Flex
      direction={"column"}
      justify={"center"}
      align={"center"}
      maxWidth={"350px"}
    >
      <Heading size={"8"} align={"center"} mb={"5"}>
        {steps[step].title}
      </Heading>

      <Text align={"center"} as="div" mb={"5"}>
        {steps[step].text}
      </Text>
      <Button onClick={() => setStep((prev) => prev + 1)}>Suivant</Button>
    </Flex>
  );
}
