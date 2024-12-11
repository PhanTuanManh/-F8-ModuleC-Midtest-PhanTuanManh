import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createItem,
  getAll,
  getOneItem,
  updateItem,
} from "../services/crudServices";
import { useNavigate, useParams } from "react-router-dom";
import { productSchema } from "../schemas/productSchema";
import { ProductContext } from "../contexts/ProductContext";

const ProductFormPage = () => {
  const { dispatch } = useContext(ProductContext);
  const nav = useNavigate();

  const [category, getCategory] = useState();

  useEffect(() => {
    (async () => {
      const data = await getAll("categories");
      getCategory(data);
      console.log(data);
    })();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const { id } = useParams();
  const onSubmit = async (formData) => {
    if (id) {
      const data = await updateItem("/products", id, formData);

      dispatch({ type: "UPDATE_PRODUCT", payload: data });

      confirm("Product updated") ? nav("/admin/products") : reset();
    } else {
      const data = await createItem("/products", formData);
      data.userId = localStorage.getItem("userId");
      console.log(data);
      dispatch({ type: "ADD_PRODUCT", payload: data });
      confirm("Product created") ? nav("/admin/products") : reset();
    }
  };

  useEffect(() => {
    id &&
      (async () => {
        const data = await getOneItem("/products/", id);
        reset(data);
        console.log(data);
      })();
  }, [id]);

  return (
    <div className="mp-form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center text-2xl font-medium">
          {id ? "Update Product" : "Create Product"}
        </h1>

        <div className="mb-3">
          <label htmlFor="title" className="mp-form-label">
            Title
          </label>
          <input
            type="text"
            className="mp-form-input"
            {...register("title", { required: true })}
          />
          {errors?.title && (
            <p className="text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="mp-form-label">
            Price
          </label>
          <input
            type="text"
            className="mp-form-input"
            pattern="^[0-9]*(\.[0-9]+)?$"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors?.price && (
            <p className="text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="mp-form-label">
            Description
          </label>
          <input
            type="text"
            className="mp-form-input"
            {...register("description")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="mp-form-label">
            Category
          </label>

          <select
            className="w-full mp-form-input"
            {...register("categoryId", { required: true, valueAsNumber: true })}
            defaultValue={category?.[0]?.id}
          >
            <option value="">Choose category</option>
            {category?.map(
              (item) => (
                console.log(item.id),
                (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                )
              )
            )}
          </select>

          {errors?.category && (
            <p className="text-red-600">{errors.category.message}</p>
          )}
        </div>

        <div className="mb-3">
          <button type="submit" className="mp-btn-submit">
            {id ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFormPage;
