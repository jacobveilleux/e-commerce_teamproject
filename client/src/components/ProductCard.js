import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ProductCard = ({ productData }) => {
  const {
    _id,
    name,
    price,
    body_location,
    category,
    imageSrc,
    numInStock,
    companyId,
  } = productData;

  return (
    <Wrapper to={`/product/${_id}`}>
      <StyledImg src={imageSrc} alt={`product ${_id}`} />
      <div>{name}</div>
      <div>{price}</div>
    </Wrapper>
  );
};

const Wrapper = styled(NavLink)`
  width: 19.5%;
  aspect-ratio: 1/2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: hidden;
  flex-wrap: wrap;
  row-gap: 0.5vw;
  transition: 0.3s ease-out;
  text-decoration: none;
  color: var(--color-4);

  &:hover {
    transform: translate(0, -15px);
    background-color: var(--color-2);
    outline: 5px solid var(--color-2);
  }
`;

const StyledImg = styled.img`
  border: 1px solid var(--color-1);
  flex-shrink: 0;
  width: 100%;
  height: 75%;
  object-fit: cover;

  &:hover {
    border: 1px solid var(--color-2);
  }
`;

export default ProductCard;
