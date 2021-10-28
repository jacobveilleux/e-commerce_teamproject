import React from "react";
import styled from "styled-components";
import { AiOutlineShopping } from "react-icons/ai";
import { BsCircle, BsCircleFill } from "react-icons/bs";

const ConfirmationPage = () => {

  const { id, email, name, surname, address, city, country, postalCode } =
  JSON.parse(localStorage.getItem("formData"));
  const cart = JSON.parse(localStorage.getItem("cart"));

  return (
    <Wrapper>
      <Title>
        <AiOutlineShopping />
        <div>Thank you for your order</div>
        <ProgressBar>
          <Circle style={{ color: "#C28285" }}>
            <BsCircleFill /> <br /> Confirmed
          </Circle>
          <Circle>
            <BsCircle /> <br /> Shipped
          </Circle>
          <Circle>
            <BsCircle /> <br /> Delivered
          </Circle>
        </ProgressBar>
      </Title>
      <Wrap>
        <OC>Order Confirmation.</OC>
        <Div>
          <Text>Order number: </Text>
          {id}{" "}
        </Div>
        <Div>
          <Text>E-mail: </Text>
          {email}{" "}
        </Div>
        <Shipping>
          <div>
            <Text>Shipping address: </Text>
            <br />
            {name} {surname} <br /> {address} <br /> {city} <br /> {country}{" "}
            <br /> {postalCode}
          </div>
        </Shipping>
        <div>
          <Order>Order details: </Order>
          <br />
        </div>
        <DivLi>
          {cart.map((order) => {
            const { imageSrc, name, amount } = order;
            return (
              <OD>
                <Pic src={imageSrc} />
                <QtyName>{name}</QtyName>
                <QtyName>
                  <Qty> Qty: </Qty> {amount}
                </QtyName>
              </OD>
            );
          })}
        </DivLi>
      </Wrap>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Title = styled.div`
  text-align: center;
  font-size: 25px;
  margin-top: 25px;
`;

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Circle = styled.div`
  font-size: 15px;
  margin-right: 40px;
  margin-left: 40px;
  margin-top: 30px;
`;

const OC = styled.div`
  font-size: 25px;
  text-align: center;
  margin-bottom: 25px;
`;

const Shipping = styled.div`
  text-align: center;
  margin-top: 50px;
  margin-bottom: 40px;
`;

const Wrap = styled.div`
  display: inline-block;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  background-color: var(--color-2);
  padding-top: 15px;
  padding-bottom: 15px;
  margin-top: 30px;
  border-radius: 20px;
  padding-right: 30px;
`;

const Div = styled.div`
  margin-left: 30px;
  margin-top: 10px;
  display: flex;
  align-items: baseline;
`;

const OD = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
const Pic = styled.img`
  width: 50px;
`;

const Qty = styled.div`
  font-weight: bold;
  margin-right: 10px;
`;

const QtyName = styled.div`
  margin-left: 20px;
  margin-top: 15px;
  display: flex;
`;

const Text = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-right: 10px;
`;

const Order = styled.div`
  display: flex;
  font-weight: bold;
  margin-left: 20px;
`;

const DivLi = styled.div`
  margin-left: 20px;
`;

export default ConfirmationPage;
