// IMPORT DEPENDANCIES
import React, { useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// IMPORT COMPONENTS
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Footer from "./Footer";
import HomePage from "./HomePage";
import CategoryPage from "./CategoryPage";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";
import ConfirmationPage from "./ConfirmationPage";
import LoginPage from "./LoginPage";
import ScrollToTop from "./utils/ScrollToTop";
import AboutPage from "./AboutPage";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalStyles />
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/products/:category">
            <CategoryPage />
          </Route>
          <Route exact path="/product/:productId">
            <ProductPage />
          </Route>
          <Route exact path="/cart">
            <CartPage />
          </Route>
          <Route exact path="/confirmed">
            <ConfirmationPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/about">
            <AboutPage />
          </Route>
        </Switch>
      </Main>
      <Footer />
    </BrowserRouter>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default App;
