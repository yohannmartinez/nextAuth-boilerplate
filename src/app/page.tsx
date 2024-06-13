"use client";
import { signIn, useSession } from "next-auth/react";
import {
  Flex,
  Text,
  Button,
  Container,
  Heading,
  Box,
  Card,
  Strong,
} from "@radix-ui/themes";

export default function Home() {
  const session = useSession();

  return (
    <Container>
      <Flex
        direction={"column"}
        align={"center"}
        justify={"center"}
        minHeight={"100vh"}
      >
        <Box maxWidth={"400px"}>
          <Box maxWidth={"400px"}>
            <Heading size={"9"} align={"center"} highContrast>
              Bienvenue sur StarQuiz
            </Heading>
          </Box>

          <Box my={"9"}>
            <Card>
              <Flex justify={"between"} align={"center"}>
                <Text color={"gray"}>
                  Connexion avec <Strong>Google</Strong>
                </Text>
                <Button onClick={() => signIn("google")}>Connexion</Button>
              </Flex>
            </Card>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
