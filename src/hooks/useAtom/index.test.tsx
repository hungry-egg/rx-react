import { useAtom } from ".";
import { render } from "@testing-library/react";
import React, { useEffect } from "react";
import { filter } from "rxjs/operators";

describe("useAtom", () => {
  it("wraps a changing value into an atom", () => {
    const evenScores: number[] = [];

    const Game = ({ score }: { score: number }) => {
      const score$ = useAtom(score);

      useEffect(() => {
        const sub = score$
          .pipe(filter((s) => s % 2 === 0))
          .subscribe((evenScore) => evenScores.push(evenScore));
        return function cleanup() {
          sub.unsubscribe();
        };
      });

      return null;
    };
    const { rerender } = render(<Game score={0} />);
    rerender(<Game score={1} />);
    rerender(<Game score={2} />);
    rerender(<Game score={3} />);
    rerender(<Game score={4} />);
    expect(evenScores).toEqual([0, 2, 4]);
  });
});
