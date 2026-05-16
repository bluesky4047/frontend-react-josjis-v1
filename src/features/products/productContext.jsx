import { createContext, useContext, useState } from "react";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "./ProductsApi";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: "",
    sortBy: "created_at",
    order: "desc",
  });

  const { data, isLoading, isError, error, refetch } =
    useGetProductsQuery(query);

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const addProduct = async (data) => await createProduct(data).unwrap();

  const editProduct = async (id, data) =>
    await updateProduct({ id, ...data }).unwrap();

  const removeProduct = async (id) => await deleteProduct(id).unwrap();

  return (
    <ProductContext.Provider
      value={{
        products: data?.data?.products || [],
        meta: data?.data?.meta || {},
        isLoading,
        error: isError ? error : null,

        // CRUD
        addProduct,
        editProduct,
        removeProduct,

        // 🔥 QUERY CONTROL
        query,
        setQuery,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
