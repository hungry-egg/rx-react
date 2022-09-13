import { useWrap } from ".";
import { render } from "@testing-library/react";
import React, { useEffect } from "react";
import { filter } from "rxjs/operators";

describe("useWrap", () => {
  it("wraps a changing value into an observable", () => {
    const evenScores: number[] = [];

    const Game = ({ score }: { score: number }) => {
      const score$ = useWrap(score);

      useEffect(() => {
        const sub = score$
          .pipe(filter((s) => s % 2 === 0))
          .subscribe((evenScore) => evenScores.push(evenScore));
        return function cleanup() {
          sub.unsubscribe();
        };
      }, [score$]);

      return null;
    };
    const { rerender } = render(<Game score={0} />);
    rerender(<Game score={1} />);
    rerender(<Game score={2} />);
    rerender(<Game score={3} />);
    rerender(<Game score={4} />);
    expect(evenScores).toEqual([0, 2, 4]);
  });

  it("it only emits when actually changed", () => {
    const scores: number[] = [];

    const Game = ({ score }: { score: number }) => {
      const score$ = useWrap(score);

      useEffect(() => {
        const sub = score$.subscribe((s) => scores.push(s));
        return function cleanup() {
          sub.unsubscribe();
        };
      }, [score$]);

      return null;
    };
    const { rerender } = render(<Game score={7} />);
    rerender(<Game score={7} />);
    expect(scores).toEqual([7]);
  });
});
