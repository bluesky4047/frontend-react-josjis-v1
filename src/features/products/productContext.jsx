import { createContext, useContext } from "react";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "./ProductsApi";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductsQuery();

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const addProduct = async (data) => {
    return await createProduct(data).unwrap();
  };

  const editProduct = async (id, data) => {
    return await updateProduct({ id, ...data }).unwrap();
  };

  const removeProduct = async (id) => {
    return await deleteProduct(id).unwrap();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        error: isError ? error : null,
        refetch,
        addProduct,
        editProduct,
        removeProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
