// IMPORT DEPENDENCIES
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// IMPORT CATEGORY IMAGES
import fitnessImage from "../images/fitness01.jpg";
import entertainmentImage from "../images/entertainment.jpg";
import medicalImage from "../images/medical.jpg";
import lifestyleImage from "../images/lifestyle.jpg";
import industrialImage from "../images/industrial.jpg";
import petsImage from "../images/pets.jpg";

const HomePage = () => {
  return (
    <>
      <Wrapper>
        <MainContainer to="/products/fitness">
          <Image src={fitnessImage} />
          <Overlay>
            <Title>Fitness</Title>
          </Overlay>
        </MainContainer>
        <MainContainer to="/products/medical">
          <Image src={medicalImage} />
          <Overlay>
            <Title>Medical</Title>
          </Overlay>
        </MainContainer>
        <MainContainer to="/products/lifestyle">
          <Image src={lifestyleImage} />
          <Overlay>
            <Title>Lifestyle</Title>
          </Overlay>
        </MainContainer>
        <MainContainer to="/products/entertainment">
          <Image src={entertainmentImage} />
          <Overlay>
            <Title>Entertainment</Title>
          </Overlay>
        </MainContainer>
        <MainContainer to="/products/industrial">
          <Image src={industrialImage} />
          <Overlay>
            <Title>Industrial</Title>
          </Overlay>
        </MainContainer>
        <MainContainer to="/products/pets%20and%20Animals">
          <Image src={petsImage} />
          <Overlay>
            <Title>Pets and Animals</Title>
          </Overlay>
        </MainContainer>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  order: 1;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-size: 2em;
  font-weight: bold;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 1;

  &:hover {
    opacity: 0;
  }
`;

const MainContainer = styled(Link)`
  position: relative;
  max-width: calc(90% / 3);
  margin: 10px;
`;

const Image = styled.img`
  display: block;
  width: 100%;
`;

export default HomePage;
