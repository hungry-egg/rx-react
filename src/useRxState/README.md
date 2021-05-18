# `useRxState`

Automatically update from one or more `Atom`s or (synchronously emitting) Rx `Observable`s.

```tsx
import { useRxState } from "@ixd-group/react-utils";

const ScoreCard = () => {
  const [name, score] = useRxState([name$, score$]);

  return (
    <div>
      {name} has {score} points!
    </div>
  );
};
```

You can either pass a single observable

```tsx
const name = useRxState(name$);
```

...or a tuple...

```tsx
const [name, score] = useRxState([name$, score$]);
```

...or a lookup...

```tsx
const { name, theScore } = useRxState({ name: name$, theScore: score$ });
```

...in each case the returned values are correctly typed.

Also, you can pass a function (that returns a single observable / tuple / lookup as above)
to avoid creating unnecessary obvservables on every render; the function will only get evaluated once on initialize.

```tsx
const ScoreCard = () => {
  const name = useRxState(() => user$.map((u) => u.name));

  return <div>My name is {name}</div>;
};
```
