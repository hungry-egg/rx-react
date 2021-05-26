import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ModuleContext } from "../../contexts/ModuleContext";
import { useStores } from ".";

describe("useServices", () => {
  const stores = { number: 7 };
  const Child = () => {
    const { number } = useStores();
    return <div data-testid="test">Shed {number}</div>;
  };
  const Parent = () => {
    return (
      <ModuleContext.Provider value={{ services: {}, stores }}>
        <Child />
      </ModuleContext.Provider>
    );
  };

  it("gets services from the provided ones", () => {
    const { getByTestId } = render(<Parent />);
    expect(getByTestId("test")).toContainHTML("Shed 7");
  });

  it("raises if the service hasn't been provided", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => {
      render(<Child />);
    }).toThrowError(
      "Expected a higher up component to provide the ModuleContext"
    );
  });
});
