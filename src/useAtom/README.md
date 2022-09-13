# `useAtom`

Wraps a changing value in a React component into a `ReadonlyAtom`.

Just as:

- `useRxState` unwraps `myNumber$` --> `number` (i.e. `Observable<number>` ---> `number`),

- `useAtom` goes the other way and **wraps** `myNumber` --> `myNumber$` (i.e. `number` ---> `ReadonlyAtom<number>`).

```tsx
import { useAtom } from "@ixd-group/react-utils";

const ScoreCard = ({ score }: { score: number }) => {
  const score$ = useAtom(score);

  // score$ will refer to the same ReadonlyAtom that you can use how you wish!

  // For example...
  useSubscribe(score$.pipe(withPrevious), ([newScore, oldScore]) => {
    console.log("Score changed from", oldScore, "to", newScore);
  });

  // ...
};
```
