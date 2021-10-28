// IMPORT DEPENDENCIES
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

// IMPORT COMPONENTS
import { StyledLoaderIcon } from "./utils/StyledIcons";

const ProductPage = ({}) => {
  // GET CART DATA FROM LOCAL STORAGE
  let cart = JSON.parse(window.localStorage.getItem("cart")) || [];

  // GET ITEM ID FROM HTTP PARAMS
  const itemId = useParams().productId;

  // CHECK IF THIS ITEM ALREADY EXIST IN THE CART
  let found = cart.find((cartItem) => {
    return cartItem._id === itemId;
  });

  // SET INITIAL STATES
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);
  const [orderQty, setOrderQty] = useState(0);

  // DESTRUCTURE VARIABLES
  const { name, price, body_location, imageSrc, numInStock } = item;

  useEffect(() => {
    // IF THE ITEM ALREADY EXIST IN THE CART, SET AND UPDATE ITEM STATE
    if (found) {
      setItem({ ...found, numInStock: found.numInStock - found.amount });
      setIsLoaded(true);

      // ELSE FETCH IT FROM THE SERVER
    } else {
      fetch(`/items/${+itemId}`)
        .then((res) => res.json())
        .then((data) => {
          setItem(data.data);
          setIsLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [itemId]);

  // ADD ITEM + ORDERED QUANTITY TO CART (LOCAL STORAGE)
  const handleAddToCart = (event) => {
    event.preventDefault();

    let found = cart.find((cartItem) => {
      return cartItem._id == itemId;
    });

    // IF ITEM ALREADY EXIST IN CART, UPDATE ORDER QTY += NEW ORDER QTY
    if (found) {
      cart[cart.indexOf(found)].amount += orderQty * 1;
      window.localStorage.setItem("cart", JSON.stringify(cart));

      // ELSE ADD A NEW ITEM INTO THE CART
    } else {
      item.amount = orderQty * 1;
      cart.push(item);
      window.localStorage.setItem("cart", JSON.stringify(cart));
    }

    window.location.reload(false);
  };

  if (isLoaded) {
    return (
      <>
        <ButtonDiv>
          <Input
            value={orderQty}
            type="number"
            min="0"
            max={numInStock}
            onChange={(event) => {
              setOrderQty(event.target.value);
            }}
          ></Input>
          <Button onClick={handleAddToCart} disabled={numInStock === 0 && true}>
            Add To Cart
          </Button>
        </ButtonDiv>
        <div>
          <Quantity>
            <b>Quantity left: {numInStock - orderQty}</b>
          </Quantity>
        </div>
        <Wrapper>
          <Image>
            <img src={imageSrc} alt={name} width="300px" />
          </Image>
          <Name>
            <h1>
              {name} <b>({body_location})</b>
            </h1>
          </Name>
          <Price>
            <h1>
              <b>{price}</b>
            </h1>
          </Price>
        </Wrapper>
      </>
    );
  } else {
    return (
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
    );
  }
};

const Quantity = styled.h1`
  margin-left: 20px;
  font-size: 20px;
`;

const Input = styled.input`
  width: 40px;
`;

const Button = styled.button`
  background-color: #9b9a94;
  width: 100px;
`;

const ButtonDiv = styled.div`
  margin: 20px 20px 5px 20px;
`;

const Price = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  font-size: 30px;
`;

const Image = styled.div`
  display: flex;
  justify-content: center;
  border-style: solid;
  border-width: 30px;
  border-radius: 20px;
  margin-left: 300px;
  margin-right: 300px;
  margin-top: 100px;
`;

const Name = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  font-size: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default ProductPage;
