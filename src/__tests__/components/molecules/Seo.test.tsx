import { shallow } from "enzyme";

import Seo from "../../../components/molecules/Seo";

it("should render correctly", () => {
  const wrapper = shallow(<Seo pageTitle="Test" />);
  expect(wrapper).toMatchSnapshot();
});
