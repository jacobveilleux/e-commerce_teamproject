import React from "react";
import styled from "styled-components";

const AboutPage = () => {
  return (
    <Wrapper>
      <StyledH1>About Us</StyledH1>
      <StyledParagraph>
        We're the Dream Team and we're cool as heck.
      </StyledParagraph>
      <span>-Jena, Jacob, Sasha, Duy</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: var(--padding-page);
  height: 100%;
`;

const StyledH1 = styled.h1`
  font-size: 100px;
`;

const StyledParagraph = styled.p`
  margin-top: 5vh;
  font-size: 50px;
`;

export default AboutPage;
