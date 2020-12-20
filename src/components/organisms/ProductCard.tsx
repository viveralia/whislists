import { FC } from "react";

import { Product } from "../../services/products";

export interface ProductCardProps {
  product: Product;
  onDelete: () => Promise<void> | void;
  onEdit: () => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, onDelete, onEdit }) => {
  return (
    <article>
      <h3>{product.name}</h3>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Remove</button>
      <a
        className="block"
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={product.imageUrl} alt={product.name} />
      </a>
    </article>
  );
};

export default ProductCard;
