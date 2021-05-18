import React, { useState } from "react";
import { render, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Subject, Subscription } from "rxjs";
import { useSubscribe } from ".";

describe("useSubscribe", () => {
  let obs$: Subject<number>, MyComponent: () => JSX.Element;

  beforeEach(() => {
    obs$ = new Subject<number>();

    MyComponent = () => {
      const [age, setAge] = useState<number>(0);
      useSubscribe(obs$, (num) => setAge(num));

      return <div data-testid="age">I am {age}</div>;
    };
  });

  it("subscribes to an observable", () => {
    const { getByTestId } = render(<MyComponent />);

    expect(getByTestId("age")).toContainHTML("I am 0");

    act(() => obs$.next(59));
    expect(getByTestId("age")).toContainHTML("I am 59");
  });

  it("uses the correct closure (i.e. currently defined callback)", () => {
    type TreeType = "ash" | "beech" | "cedar";
    const treeTypes: TreeType[] = [],
      subject$ = new Subject<void>();
    const Tree = ({ type }: { type: TreeType }) => {
      useSubscribe(subject$, () => {
        treeTypes.push(type);
      });
      return <div />;
    };
    const { rerender } = render(<Tree type="ash" />);
    expect(treeTypes).toEqual([]);
    subject$.next();
    expect(treeTypes).toEqual(["ash"]);
    rerender(<Tree type="beech" />);
    expect(treeTypes).toEqual(["ash"]);
    subject$.next();
    expect(treeTypes).toEqual(["ash", "beech"]);
  });

  it("cleans up", () => {
    const unsubscribe = jest.fn() as Subscription["unsubscribe"];
    const subscribe = jest
      .spyOn(obs$, "subscribe")
      .mockImplementation((callback) => ({ unsubscribe } as Subscription));
    const { unmount } = render(<MyComponent />);
    expect(subscribe).toHaveBeenCalled();
    expect(unsubscribe).not.toHaveBeenCalled();
    unmount();
    expect(unsubscribe).toHaveBeenCalled();
  });
});
