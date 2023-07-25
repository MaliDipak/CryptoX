import { Avatar, Box, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import founder from "../assets/dip.jpg";

const Footer = () => {
  return (
    <Box
      bgColor={"#2B6CB0"}
      color={"whiteAlpha.700"}
      minH={"48"}
      px={"16"}
      py={["16", "8"]}
    >
      <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
        <VStack w={"full"} alignItems={["center", "flex-start"]}>
          <Text fontWeight={"bold"}>About Us</Text>
          <Text
            fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}
          >
            👋 Hi there! I'm Dipak Mali, a passionate B.Tech student
            specializing in data science at R C Patel Institute of Technology,
            Shirpur.
          </Text>
        </VStack>

        <VStack>
          <Avatar boxSize={"28"} mt={["4", "0"]} src={founder} />
          <Text>Dipak Mali</Text>
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;
