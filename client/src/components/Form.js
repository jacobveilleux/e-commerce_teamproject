import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
const { v4: uuidv4 } = require("uuid");

const Form = () => {
  const cart = JSON.parse(window.localStorage.getItem("cart")) || [];

  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [email, setEmail] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [country, setCountry] = useState(null);
  const [isBooked, setIsBooked] = useState(false);

  let history = useHistory();

  if (isBooked) {
    history.push("/confirmed");
  }

  const submitOrder = async (e) => {
    e.preventDefault();

    let formData = {
      id: uuidv4(),
      name: name,
      surname: surname,
      email: email,
      address: address,
      postalCode: postalCode,
      city: city,
      country: country,
      cart: cart,
    };

    let postObject = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        Accept: "aaplication/json",
        "Content-Type": "application/json",
      },
    };

    fetch("/checkout", postObject)
      .then((res) => res.json())
      .then((json) => {
        const { status, error } = json;
        if (status === 200) {
          window.localStorage.setItem("formData", JSON.stringify(json.data));
          setIsBooked(true);
        } else if (error) {
          console.log(error);
        }
      });
  };

  return (
    <WholeWrap>
      <InputWrap>
        <Text>Place your order</Text>
        <Input
          onChange={(ev) => setName(ev.target.value)}
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "Name")}
          name="name"
          type="text"
          placeholder="Name"
        />

        <Input
          onChange={(ev) => setSurname(ev.target.value)}
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "Last name")}
          surname="surname"
          type="text"
          placeholder="Last name"
        />

        <Input
          onChange={(ev) => setEmail(ev.target.value)}
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "Email")}
          email="email"
          type="text"
          placeholder="Email"
        />

        <Input
          onChange={(ev) => setAddress(ev.target.value)}
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "Address")}
          address="address"
          type="text"
          placeholder="Address"
        />

        <PostCity>
          <Inputs
            onChange={(ev) => setCity(ev.target.value)}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "City")}
            city="city"
            type="text"
            placeholder="City"
          />

          <Inputs
            onChange={(ev) => setPostalCode(ev.target.value)}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Postal Code")}
            postalCode="postalCode"
            type="text"
            placeholder="Postal Code"
          />
        </PostCity>

        <Input
          onChange={(ev) => setCountry(ev.target.value)}
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "Country")}
          country="country"
          type="text"
          placeholder="Country"
        />

        <StyledButton
          disabled={
            !name ||
            !surname ||
            !address ||
            !city ||
            !postalCode ||
            !country ||
            !email
              ? true
              : false
          }
          onClick={submitOrder}
        >
          Submit
        </StyledButton>
      </InputWrap>
    </WholeWrap>
  );
};

const WholeWrap = styled.div`
  display: inline-block;
  background-color: var(--color-2);
  border-radius: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 40px;
  margin-left: 50px;
`;

const InputWrap = styled.div`
  width: 250px;
  text-align: center;
  float: right;
`;

const Text = styled.div`
  margin: 10px 0;
  font-family: "Khula", sans-serif;
  font-size: 25px;
`;

const PostCity = styled.div`
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  height: 30px;
  margin-left: 35%;
  transform: translate(-50%);
  font-family: "Cormorant Garamond", serif;
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 3px;
  background-color: var(--color-1);
  color: white;
`;

const Input = styled.input`
  width: 200px;
  height: 35px;
  margin-bottom: 15px;
`;

const Inputs = styled.input`
  width: 81px;
  height: 35px;
  margin-bottom: 15px;
`;

export default Form;