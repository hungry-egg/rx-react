# `useSubscribe`

Subscribe to any Rx `Observable`, (and clean up by correctly unsubscribing when unmounted).

```tsx
import { useSubscribe } from "@hungry-egg/rx-react";

const MyComponent = () => {
  useSubscribe(keyPresses$, (keyPress) => {
    // do something with the keyPress
  });

  // ...
};
```

The second argument is the same callback you'd use if you were subscribing directly, e.g.
if you were doing `keyPresses$.subscribe((keyPress) => { /* do something */ })`.

It manages unsubscribing for you via lifecycle hooks so no need to unsubscribe.
