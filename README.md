# @hungry-egg/rx-react

Helpers for dealing with RxJS observables in React.

## useUnwrap

unwraps an Rx observable for use in React, e.g.

for an observable

```ts
const loggedInUser$ = new BehaviorSubject({ name: "Pingu" });
```

(or if using the library `@hungry-egg/rx-state` you can use `atom({ name: "Pingu" })`)

then to use in React you simply "unwrap" the observable to a normal value

```tsx
import { useUnwrap } from "@hungry-egg/rx-react";

function NavBar() {
  const loggedInUser = useUnwrap(loggedInUser$);

  return <div>Logged in as {loggedInUser.name}</div>;
}
```

See [the README](./src/useUnwrap) for more details.

## [useSubscribe](./src/useSubscribe)

subscribes to any Rx observable

```tsx
import { useSubscribe } from "@hungry-egg/rx-react";

function MyComponent() {
  useSubscribe(keyPresses$, (keyPress) => {
    // do something with the keyPress
  });
  // ...
}
```

See [the README](./src/useSubscribe) for more details.

## [useWrap](./src/useWrap)

Occasionally you may wish to **create** an Rx observable from a value inside a React render function. This is effectively the opposite of `useUnwrap`.

```tsx
import { useWrap } from "@hungry-egg/rx-react";

type Props = { score: number };

function ScoreCard({ score }: Props) {
  const score$ = useWrap(score);
  // score$ is an Observable<number> that you can subscribe to, etc.
  // ...
}
```

See [the README](./src/useWrap) for more details.

## Build

    yarn build

## Build on file change

    yarn watch

## Test

    yarn test
