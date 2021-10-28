import React from "react";
import styled, { keyframes } from "styled-components";
import { FiRefreshCw, FiArrowLeft } from "react-icons/fi";

// REFRESH ICON
const LoadingAnimation = keyframes`
0% {
  opacity: 1;
  transform: rotate(0deg);
}

50% {
  opacity: 0.25;
  transform: rotate(180deg);
}

100% {
  opacity: 1;
  transform: rotate(360deg);
}
`;

export const StyledLoaderIcon = () => {
  return <StyledLoader />;
};

const StyledLoader = styled(FiRefreshCw)`
  width: 50px;
  height: 50px;

  animation: ${LoadingAnimation} 2500ms ease-in-out;
  animation-iteration-count: infinite;
`;

// ARROW LEFT ICON

export const StyledArrowLeftIcon = () => {
  return <StyledArrowLeft />;
};

const StyledArrowLeft = styled(FiArrowLeft)`
  margin-right: 20px;
  color: grey;
`;
