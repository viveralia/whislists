import { FC, useContext, useEffect, useRef, useState } from "react";
import { isEqual } from "lodash";

import * as productsService from "../../services/products";
import ProductCard from "./ProductCard";
import UserContext from "../../context/UserContext";
import useForm from "../../hooks/useForm";
import { handleServerError } from "../../utils";
import { Product } from "../../services/products";
import { WishList } from "../../services/wishlists";

export interface ProductsListProps {
  wishList: WishList;
}

const INITIAL_FORM_VALUES = {
  name: "",
  url: "",
};

const ProductsList: FC<ProductsListProps> = ({ wishList }) => {
  const user = useContext(UserContext);

  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[] | undefined>(undefined);

  const {
    values,
    handleChange,
    handleSubmit,
    isSubmitting,
    resetForm,
    updateFormValues,
  } = useForm(INITIAL_FORM_VALUES, async (product) => {
    try {
      if (!isEqual(product, productToEdit)) {
        productToEdit
          ? await productsService.updateProductInAWishlist(
              wishList,
              product as Product
            )
          : await productsService.addProductToWishList(
              wishList,
              user!,
              product
            );
      }
      resetForm();
      setProductToEdit(null);
    } catch (error) {
      handleServerError(error);
    }
  });

  useEffect(() => {
    const unsuscribe = productsService.suscribeToProductsInAWishList(
      wishList,
      setProducts
    );
    return () => unsuscribe();
  }, [wishList]);

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit} ref={formRef}>
        <h2>
          {productToEdit
            ? "Editing product"
            : "Add some products to your whislist!"}
        </h2>
        <input
          required
          type="text"
          name="name"
          minLength={1}
          maxLength={140}
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
          className="block"
          ref={nameInputRef}
        />
        <input
          required
          type="url"
          name="url"
          minLength={5}
          maxLength={250}
          placeholder="URL"
          onChange={handleChange}
          value={values.url}
          className="block"
        />
        {!productToEdit && (
          <button className="block" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Adding product..." : "Add product to the wishlist"}
          </button>
        )}
        {productToEdit && (
          <button className="block" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Saving product..." : "Save changes"}
          </button>
        )}
      </form>
      {!products && <p>Loading products...</p>}
      {products?.length === 0 && (
        <p>You don't have products in this wishlist. Try adding one.</p>
      )}
      {products && products.length > 0 && (
        <ul className="grid">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard
                product={product}
                onDelete={() => {
                  try {
                    productsService.removeProductFromAWishList(
                      wishList,
                      product
                    );
                  } catch (error) {
                    handleServerError(error);
                  }
                }}
                onEdit={() => {
                  setProductToEdit(product);
                  updateFormValues(product);
                  formRef.current?.scrollIntoView({ behavior: "smooth" });
                  nameInputRef.current?.focus();
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default ProductsList;
