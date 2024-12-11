import { useContext, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Layout from "../layout/Layout";
import { Button } from "antd";

const HomePage = () => {
  const { state, dispatch } = useContext(ProductContext);
  const { products } = state;
  const [grid, setGrid] = useState(true);
  const [list, setList] = useState(true);

  const handleGrid = () => {
    setGrid(true);
    setList(false);
  };

  const handleList = () => {
    setList(true);
    setGrid(false);
  };
  return (
    <Layout>
      <div className="home container mx-auto my-[50px] pb-16 sm:px-6 lg:px-8">
        <div className="flex gap-2">
          <Button type="primary" className="mb-5" onClick={() => handleGrid()}>
            <i className="fa-brands fa-figma"></i>
            Grid
          </Button>
          <Button type="primary" className="mb-5" onClick={() => handleList()}>
            <i className="fa-solid fa-list"></i>
            List
          </Button>
        </div>

        {grid && (
          <div className="grid grid-cols-4 gap-10 ">
            {products.map((product) => (
              <div key={product.id} className="text-center">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-[300px] object-cover"
                />
                <h2>{product.title}</h2>
                <p>{product.description}</p>
              </div>
            ))}
          </div>
        )}

        {list && (
          <div className="grid grid-cols-1 gap-10 ">
            {products.map((product) => (
              <div
                key={product.id}
                className="text-center flex border gap-10 items-center "
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-[300px] h-[300px] object-cover"
                />
                <div>
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
