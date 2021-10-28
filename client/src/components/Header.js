import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { RiShoppingCartLine } from "react-icons/ri";
import { GiJewelCrown } from "react-icons/gi";

const Header = () => {
  return (
    <>
      <nav>
        <Ul>
          <StyledLi>
            <StyledLink to="/"> Home </StyledLink>
          </StyledLi>
          <StyledLi>
            <StyledLink to="/login"> Log-in </StyledLink>
          </StyledLi>
          <li>
            <Logo to="/">
              {" "}
              <GiJewelCrown />{" "}
            </Logo>
          </li>
          <StyledLi>
            <StyledLink to="/orders"> Orders </StyledLink>
          </StyledLi>
          <StyledLi>
            <StyledLink to="/cart">
              {" "}
              <RiShoppingCartLine />{" "}
            </StyledLink>
          </StyledLi>
        </Ul>
      </nav>
    </>
  );
};

const Logo = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 40px;
  font-style: oblique;
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  background-color: #ebe4de;
  padding: var(--padding-page);
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 30px;
  font-family: "Cormorant Garamond", serif;
`;

const StyledLi = styled.li`
  padding: 0 20px;
`;

export default Header;
