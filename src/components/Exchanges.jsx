import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {
  Container,
  HStack,
  VStack,
  Heading,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";

import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";

const Exchanges = () => {
  //use state hook to dynamically update exchanges data
  const [exchanges, setExchanges] = useState([]); //exchange is array which contain api data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("No Error");
  const [page, setPage] = useState(1);

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const btns = new Array(132).fill(1);

  // use Effect hook to call api at run time
  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges?page=${page}`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        setErrorMessage(error);
      }
    };
    fetchExchanges();
  }, [page]);

  if (error) return <ErrorComponent message={errorMessage} />;

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((i) => (
              <ExchangeCard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>

          {/* Page Change Buttonts */}
          <HStack w={"full"} overflow={"auto"} p={"8"}>
            {btns.map((item, index) => (
              <Button
                key={index + item}
                bgColor={"#2B6CB0"}
                color={"white"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

// Exchange Card component for card
const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target={"blank"}>
    <VStack
      width={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
      />

      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>

      <Text size={"md"} noOfLines={1}>
        {name}
      </Text>
    </VStack>
  </a>
);

export default Exchanges;
