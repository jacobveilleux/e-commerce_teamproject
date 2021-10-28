import React, { createContext, useReducer } from "react";

export const ItemsContext = createContext();

const initialState = {
  isLoaded: false,
  products: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET-PRODUCTS-BY-CATEGORY": {
      return {
        ...state,
        isLoaded: true,
        products: action.data,
      };
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
};

export const ItemsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProductsByCategory = (data) => {
    dispatch({
      type: "GET-PRODUCTS-BY-CATEGORY",
      ...data,
    });
  };

  return (
    <ItemsContext.Provider
      value={{ state, action: { getProductsByCategory } }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
