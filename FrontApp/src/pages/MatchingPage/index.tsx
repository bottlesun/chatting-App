import React from "react";
import {Container, Title} from "@pages/MatchingPage/styles";
import Matching from "@components/Matching";

const MatchingPage = () => {
  return (
    <Container>
      <Title>Hello, let's chat !</Title>
      <Matching/>
    </Container>
  )
}
export default MatchingPage;