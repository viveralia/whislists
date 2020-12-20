import { shallow } from "enzyme";

import ProductCard from "../../../components/organisms/ProductCard";
import products from "../../../fixtures/products";

it("should render correctly", () => {
  const wrapper = shallow(
    <ProductCard
      product={products[0]}
      onDelete={() => console.log("Deleting")}
      onEdit={() => console.log("Editing")}
    />
  );
  expect(wrapper).toMatchSnapshot();
});
