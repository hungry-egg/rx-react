# `useUnwrap`

Unwrap one or more synchronously emitting rx `Observable`s.

```tsx
import { useUnwrap } from "@hungry-egg/rx-react";

const ScoreCard = () => {
  const [name, score] = useUnwrap([name$, score$]);

  return (
    <div>
      {name} has {score} points!
    </div>
  );
};
```

You can either pass a single observable

```tsx
const name = useUnwrap(name$);
```

...or a tuple...

```tsx
const [name, score] = useUnwrap([name$, score$]);
```

...or a lookup...

```tsx
const { name, theScore } = useUnwrap({ name: name$, theScore: score$ });
```

...in each case the returned values are correctly typed.

Also, you can pass a function (that returns a single observable / tuple / lookup as above)
to avoid creating unnecessary obvservables on every render; the function will only get evaluated once on initialize.

```tsx
const ScoreCard = () => {
  const name = useUnwrap(() => user$.pipe(map((u) => u.name)));

  return <div>My name is {name}</div>;
};
```
