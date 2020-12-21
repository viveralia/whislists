import { FC, useContext } from "react";

import { UserContext } from "../../context";
import { Product } from "../../services/products";

export interface ProductCardProps {
  product: Product;
  onDelete: () => Promise<void> | void;
  onEdit: () => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, onDelete, onEdit }) => {
  const user = useContext(UserContext);

  return (
    <article>
      <h3>{product.name}</h3>
      {product.createdBy.id === user?.uid && (
        <div>
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Remove</button>
        </div>
      )}
      <a
        className="block"
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={product.imageUrl} alt={product.name} />
      </a>
      <p>Added by: {product.createdBy.name}</p>
    </article>
  );
};

export default ProductCard;
