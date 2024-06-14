import { db } from "@/lib/firebase";
import usersPlanet from "@/lib/usersPlanet";
import { Box, Button, Heading, Slider, Spinner } from "@radix-ui/themes";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Planet } from "../../../types/planet";

export default function Age({
  userId,
  email,
}: {
  userId: string | undefined;
  email: string | null | undefined;
}) {
  const router = useRouter();
  const [age, setAge] = useState<number[]>([30]);
  const [loading, setLoading] = useState<boolean>(false);

  const ageEmojis = (): string => {
    if (age[0] >= 0 && age[0] <= 15) return "👶";
    if (age[0] >= 16 && age[0] <= 25) return "🙋‍♂️";
    if (age[0] >= 26 && age[0] <= 30) return "👨‍⚖️";
    if (age[0] >= 31 && age[0] <= 40) return "👴";
    return "💀";
  };

  const handleAgeUpdate = async () => {
    if (userId) {
      setLoading(true);
      const collectionRef = collection(db, "planets");
      const snapshot = await getDocs(collectionRef);
      const planets = snapshot.docs.map((doc): Planet => {
        const planet = { ...doc.data() };

        return {
          id: doc.id,
          name: planet.name,
        };
      });

      const userDocRef = doc(db, "users", userId);
      const userPlanetName: string = usersPlanet[email!];
      const userPlanet: Planet | undefined = planets.find(
        (planet) => planet.name === userPlanetName
      );

      if (!!userPlanet?.id || !userId || !email) router.refresh();

      await updateDoc(userDocRef, {
        age: age[0],
        planetId: userPlanet ? userPlanet.id : null,
      });

      router.push("/home");
    }
  };

  return (
    <>
      <Heading size={"9"} mb={"5"}>
        {ageEmojis()}
      </Heading>
      <Box maxHeight={"100px"} width={"300px"}>
        <Slider
          defaultValue={age}
          onValueChange={(newValue) => setAge(newValue)}
        />
      </Box>
      <Button
        mt={"5"}
        onClick={() => {
          handleAgeUpdate();
        }}
      >
        {loading ? <Spinner /> : `J'ai ${age} ans`}
      </Button>
    </>
  );
}
