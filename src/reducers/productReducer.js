// src/reducers/productReducer.js

export const productReducer = (state, action) => {
  const { products } = state;
  const { type, payload } = action;

  switch (type) {
    case "SET_PRODUCTS":
      return { ...state, products: payload };

    case "ADD_PRODUCT":
      return { ...state, products: [...products, payload] };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: products.map((item) =>
          item.id === payload.id ? { ...item, ...payload } : item
        ),
      };

    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: products.filter((item) => item.id !== payload),
      };

    default:
      return state;
  }
};
