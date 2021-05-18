# `useSubscribe`

Subscribe to any Rx `Observable`, (and clean up by correctly unsubscribing when unmounted).

```tsx
import { useSubscribe } from "@ixd-group/react-utils";

const RailController = () => {
  useSubscribe(keyPresses$, (keyPress) => {
    // do something with the keyPress
  });

  // ...
};
```

The second argument is the same callback you'd use if you were subscribing directly, e.g.
if you were doing `keyPresses$.subscribe((keyPress) => { /* do something */ })`.

The hook manages unsubscribing for you, and also behaves as expected regarding enclosed variables (which isn't a given), i.e.

```tsx
  const someVar = ...;

  useSubscribe(keyPresses$, (keyPress) => {
    // do something with the someVar - it'll be the "correct" one, not the one from a previous render
  });
```
