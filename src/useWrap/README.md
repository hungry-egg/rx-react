# `useWrap`

Wraps a changing value in a React component into an RxJS `Observable`.

Just as:

- `useUnwrap` unwraps `myNumber$` --> `number` (i.e. `Observable<number>` ---> `number`),

- `useWrap` goes the other way and **wraps** `myNumber` --> `myNumber$` (i.e. `number` ---> `Observable<number>`).

```tsx
import { useWrap } from "@hungry-egg/rx-react";

const ScoreCard = ({ score }: { score: number }) => {
  const score$ = useWrap(score);

  // score$ will refer to the same observable object on each render

  // For example...
  useSubscribe(score$.pipe(withPrevious), ([newScore, oldScore]) => {
    console.log("Score changed from", oldScore, "to", newScore);
  });

  // ...
};
```
