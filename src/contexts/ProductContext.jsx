import { createContext, useEffect, useReducer } from "react";
import { productReducer } from "../reducers/productReducer";
import { getAll } from "../services/crudServices";

export const ProductContext = createContext({});

// eslint-disable-next-line react/prop-types
export const ProductProvicer = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, {
    products: [],
  });
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAll("/products");
      console.log(data);
      dispatch({ type: "SET_PRODUCTS", payload: data });
    };
    fetchProducts();
  }, []);
  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
