import React, { useContext, useEffect, useState } from "react";
import { getAll, removeItem } from "../services/crudServices";
import { ProductContext } from "../contexts/ProductContext";
import { Link } from "react-router-dom";
import CustomAlert from "../components/Alert";
import Layout from "../layout/Layout";

const ProductListPage = () => {
  const { state, dispatch } = useContext(ProductContext);
  const { products } = state;
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const [category, getCategory] = useState();

  useEffect(() => {
    (async () => {
      const data = await getAll("categories");
      getCategory(data);
      console.log(data);
    })();
  }, []);

  console.log(category);

  const handleRemoveProduct = async (id) => {
    if (confirm("Are you sure")) {
      await removeItem("/products", id);
      dispatch({ type: "REMOVE_PRODUCT", payload: id });

      setAlertType("success");
      setAlertMessage("Sản phẩm đã được xóa thành công!");
    }
  };

  return (
    <Layout>
      <div className="mp-form-container">
        {alertMessage && (
          <CustomAlert typeAlert={alertType} desAlert={alertMessage} />
        )}

        <Link to={"/admin/products/add"} className="mp-btn-primary mb-4">
          Add new product
        </Link>

        <table className="mp-table">
          <thead className="mp-table-header">
            <tr>
              <th className="mp-table-cell">ID</th>
              <th className="mp-table-cell">Title</th>
              <th className="mp-table-cell">Price</th>
              <th className="mp-table-cell">Image</th>
              <th className="mp-table-cell">Description</th>
              <th className="mp-table-cell">Category</th>
              <th className="mp-table-cell">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id} className="border-t border-gray-200">
                <td className="mp-table-cell">{item.id}</td>
                <td className="mp-table-cell">{item.title}</td>
                <td className="mp-table-cell">{item.price}</td>
                <td className="mp-table-cell">
                  <img src={item.thumbnail} alt="thumbnail" />
                </td>
                <td className="mp-table-cell">{item.description}</td>
                <td className="mp-table-cell">{item.categoryId}</td>
                <td className="mp-table-cell">
                  <Link
                    to={`/admin/products/detail/${item.id}`}
                    className="mp-btn-detail"
                  >
                    Detail
                  </Link>
                  <Link
                    to={`/admin/products/update/${item.id}`}
                    className="mp-btn-warning mx-2"
                  >
                    Update
                  </Link>
                  <button
                    className="mp-btn-danger"
                    onClick={() => handleRemoveProduct(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ProductListPage;
