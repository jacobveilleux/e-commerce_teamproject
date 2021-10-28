import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <Wrapper>
      <ul>
        <li>
          <MenuItems to="/products/medical">Medical</MenuItems>
        </li>
        <li>
          <MenuItems to="/products/fitness">Fitness</MenuItems>
        </li>
        <li>
          <MenuItems to="/products/lifestyle">Lifestyle</MenuItems>
        </li>
        <li>
          <MenuItems to="/products/entertainment">Entertainment</MenuItems>
        </li>
        <li>
          <MenuItems to="/products/industrial">Industrial</MenuItems>
        </li>
        <li>
          <MenuItems to="/products/pets%20and%20Animals">Pets and Animals</MenuItems>
        </li>
      </ul>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <li>
            <StyledATag href="https://www.facebook.com/">
              <FaFacebook />
            </StyledATag>
          </li>
          <li>
            <StyledATag href="https://www.instagram.com/">
              <FaInstagram />
            </StyledATag>
          </li>
          <li>
            <StyledATag href="https://twitter.com/?lang=en">
              <FaTwitter />
            </StyledATag>
          </li>
        </div>
        <span style={{ textAlign: "center" }}>
          The content of this site is copyright-protected and is the property of
          the Dream Team.
        </span>
      </ul>
      <ul>
        <li>
          <MenuItems to="/">Home</MenuItems>
        </li>
        <li>
          <MenuItems to="/about">About</MenuItems>
        </li>
        <li>
          <MenuItems to="/contact-us">Contact Us</MenuItems>
        </li>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--color-3);
  display: flex;
  justify-content: space-between;
  padding: var(--padding-page);
`;

const MenuItems = styled(NavLink)`
  font-family: var(--font-heading);
  color: var(--color-4);
  text-decoration: none;
  font-size: 30px;
`;

const StyledATag = styled.a`
  font-family: var(--font-heading);
  color: var(--color-4);
  text-decoration: none;
  font-size: 30px;
  padding: 10px;
`;

export default Footer;
