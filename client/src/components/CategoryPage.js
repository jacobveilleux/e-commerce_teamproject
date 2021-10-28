// IMPORT DEPENDENCIES
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

// IMPORT COMPONENTS
import ProductCard from "./ProductCard";
import { StyledLoaderIcon } from "./utils/StyledIcons";

// IMPORT CONTEXT
import { ItemsContext } from "../contexts/ItemsContext";

const CategoryPage = () => {
  const { category } = useParams();
  const {
    state: { isLoaded, products },
    action: { getProductsByCategory },
  } = useContext(ItemsContext);

  const [isReloaded, setReloaded] = useState(false);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const capitalizedCategory = capitalizeFirstLetter(category);

  useEffect(() => {
    fetch(`/items/category/${capitalizedCategory}`)
      .then((res) => res.json())
      .then((data) => {
        getProductsByCategory(data);
        setReloaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [category]);

  return (
    <Wrapper>
      <StyledH1>{capitalizedCategory}</StyledH1>
      <Container>
        {isLoaded && isReloaded ? (
          products.map((product) => {
            const {
              _id,
              name,
              price,
              body_location,
              category,
              imageSrc,
              numInStock,
              companyId,
            } = product;

            return (
              <ProductCard
                key={_id}
                productData={{
                  _id: _id,
                  name: name,
                  price: price,
                  body_location: body_location,
                  category: category,
                  imageSrc: imageSrc,
                  numInStock: numInStock,
                  companyId: companyId,
                }}
              />
            );
          })
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
              width: "100%",
            }}
          >
            <StyledLoaderIcon />
          </div>
        )}
      </Container>
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

const Container = styled.div`
  margin-top: 5vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  row-gap: 3vw;
`;

export default CategoryPage;
