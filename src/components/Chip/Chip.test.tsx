import { shallow, mount } from "enzyme";
import React from "react";

import Chip from "./Chip";

describe("Chip ", () => {
  it("renders default chip", () => {
    const wrapper = shallow(<Chip value="positive" />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders lead-value chip", () => {
    const wrapper = shallow(<Chip lead="Owner" value="Bob" />);
    expect(wrapper).toMatchSnapshot();
  });

  it("displays the value", () => {
    const wrapper = mount(<Chip value="positive" />);
    expect(wrapper.find(".p-chip").text()).toBe("positive");
  });

  it("displays the lead-value", () => {
    const wrapper = mount(<Chip lead="Owner" value="Bob" />);
    expect(wrapper.find(".p-chip").text()).toBe("OWNERBob"); // Colon and space added with CSS
  });

  it("displays the dismiss action", () => {
    const onDismiss = jest.fn();
    const wrapper = mount(
      <Chip lead="Owner" value="Bob" onDismiss={onDismiss} />
    );
    expect(wrapper.find(".p-chip__dismiss").exists()).toBe(true);
  });

  it("calls onDismiss when clicked", () => {
    const onDismiss = jest.fn();
    const wrapper = mount(
      <Chip lead="Owner" value="Bob" onDismiss={onDismiss} />
    );
    const dismissButton = wrapper.find(".p-chip__dismiss");
    dismissButton.simulate("click");
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("calls onKeyDown when key pressed", () => {
    const onClick = jest.fn();
    const wrapper = mount(<Chip lead="Owner" value="Bob" onClick={onClick} />);
    const chip = wrapper.find(".p-chip");
    chip.simulate("keydown", { key: "Enter" });
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0]).toEqual([{ lead: "Owner", value: "Bob" }]);
  });

  it("renders positive chip", () => {
    const wrapper = shallow(<Chip appearance="positive" value="positive" />);
    expect(wrapper.prop("className").includes("p-chip--positive")).toBe(true);
  });

  it("renders negative chip", () => {
    const wrapper = shallow(<Chip appearance="negative" value="negative" />);
    expect(wrapper.prop("className").includes("p-chip--negative")).toBe(true);
  });

  it("renders caution chip", () => {
    const wrapper = shallow(<Chip appearance="caution" value="caution" />);
    expect(wrapper.prop("className").includes("p-chip--caution")).toBe(true);
  });

  it("renders information chip", () => {
    const wrapper = shallow(
      <Chip appearance="information" value="information" />
    );
    expect(wrapper.prop("className").includes("p-chip--information")).toBe(
      true
    );
  });
});
