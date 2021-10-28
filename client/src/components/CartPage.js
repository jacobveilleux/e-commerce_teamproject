// IMPORT DEPENDENCIES
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { AiOutlineShoppingCart } from "react-icons/ai";

// IMPORT COMPONENTS
import Form from "./Form";

const CartPage = () => {
  let history = useHistory();
  // GET CART DATA FROM LOCAL STORAGE
  let cart = JSON.parse(window.localStorage.getItem("cart")) || [];

  // INITIALIZE STATES
  const [totalPrice, setTotalPrice] = useState(0);

  const totalPriceUpdate = (cart) => {
    let totalPrice = 0;

    // LOOP THROUGH EACH ITEM IN CART AND UPDATE TOTAL PRICE
    cart.forEach((item) => {
      const { price, amount } = item;
      const priceAsNum = price.substring(1);

      totalPrice += priceAsNum * amount;
    });

    setTotalPrice(totalPrice);
    return;
  };

  const handleQtyChange = (event) => {
    let cart = JSON.parse(window.localStorage.getItem("cart")) || [];

    // GET ID FROM KEY PROPERTY
    const _id = event.target.id;

    // FIND THE RIGHT ITEM IN THE CART ARRAY
    const foundItem = cart.find((cartItem) => {
      return cartItem._id == _id;
    });

    // UPDATE ORDER QTY += NEW ORDER QTY IN CART
    cart[cart.indexOf(foundItem)].amount = event.target.value * 1;
    window.localStorage.setItem("cart", JSON.stringify(cart));

    // UPDATE TOTAL PRICE
    totalPriceUpdate(cart);
  };

  const handleRemoveItem = (index) => {
    let cart = JSON.parse(window.localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    console.log(`index`, index);
    console.log(`cart`, cart);

    window.localStorage.setItem("cart", JSON.stringify(cart));
    totalPriceUpdate(cart);
  };

  // CALCULATE AND UPDATE TOTAL PRICE ONCE ON PAGE LOAD
  useEffect(() => {
    totalPriceUpdate(cart);
  }, []);

  return (
    <Flex>
      {cart[0] ? (
        <>
          <Wrap>
            {cart.map((item) => {
              const {
                _id,
                name,
                price,
                body_location,
                category,
                imageSrc,
                numInStock,
                companyId,
                amount,
              } = item;

              const index = cart.indexOf(item);

              return (
                <Wrapper key={_id}>
                  <img src={imageSrc} width="100px" />
                  <Name>{name}</Name>
                  <Price>{price}</Price>
                  <Input
                    id={_id}
                    type="number"
                    min="1"
                    max={numInStock}
                    defaultValue={amount}
                    onChange={handleQtyChange}
                  ></Input>
                  <button
                    onClick={() => {
                      handleRemoveItem(index);
                    }}
                  >
                    Remove
                  </button>
                </Wrapper>
              );
            })}

            <BottomDiv>
              <p>
                <b>Total: {Math.round(totalPrice * 100) / 100}$</b>
              </p>
            </BottomDiv>
          </Wrap>
          <Form />
        </>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <EmptyWrap>
            <div>
              <AiOutlineShoppingCart />
            </div>
            <div>Oh, no! Your shopping cart is empty!</div>
          </EmptyWrap>
          <Sub>
            Before proceeding to checkout, you must add some products to your
            shopping cart.
          </Sub>
          <Button
            type="button"
            onClick={() => {
              history.push("/");
            }}
          >
            Back to Browse
          </Button>
        </div>
      )}
    </Flex>
  );
};

const Wrap = styled.div``;
const EmptyWrap = styled.div`
  font-size: 30px;
  text-align: center;
  margin-top: 60px;
`;

const Button = styled.button`
  width: 180px;
  background-color: var(--color-1);
  color: white;
  height: 30px;
  text-align: center;
  border: none;
  font-family: "Cormorant Garamond", serif;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 700;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 30px;
  &:hover {
    cursor: pointer;
  }
`;

const Sub = styled.div`
  text-align: center;
  color: grey;
  margin-top: 10px;
`;

const BottomDiv = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`;

// const Purchase = styled.button`
//   width: 100px;
// `;

const Input = styled.input`
  margin-right: 15px;
  margin-left: 15px;
  width: 50px;
`;

const Price = styled.p`
  margin-right: 15px;
  margin-left: 15px;
`;

const Name = styled.p`
  margin-left: 15px;
  margin-right: 15px;
`;

const Flex = styled.div`
  display: flex;
  margin: auto;
  margin-top: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid black;
  padding: 30px;
  width: 800px;
  height: 160px;
`;

const InputWrap = styled.form``;

export default CartPage;
