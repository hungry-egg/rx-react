# `createModule`

A "module" is a _self-contained React component_ that _has its own lookup of stores and services_, and _interacts with the outside world only via props_.

A module is initialised with stores, services and props, then deeply-nested child controller components can use `useModule` to access these as needed.

Usage:

### `src/myModule/stores.ts`

```tsx
export const createStores = () => ({
  timer: new TimerStore(),
  // ...
});
```

### `src/myModule/services.ts`

```tsx
export const createServices = () => ({
  buttonListener: new ButtonListener(),
  // ...
});
```

### `src/myModule/index.ts` (the module component itself)

Initialize the stores, services and module props in the module root component.

```tsx
import { createModule } from "@ixd-group/react-utils";
import { createStores } from "./stores";
import { createServices } from "./services";
import { RootController } from "./components/RootController";

export type Props = {
  onClick: () => void;
  initialTime: number;
  //...
};

export const [MyModule, useModule] = createModule<
  Props,
  typeof createStores,
  typeof createServices
>({
  createStores,
  createServices,
  root: RootController, // RootController is a controller component you've defined yourself
});
```

The exported component `MyModule` is usable as you would any React component, with its props as the interface:

```tsx
<MyModule initialTime={time} onClick={handleClick} />
```

### `src/myModule/components/ClockController.ts` (some child component)

Then consume the stores / services as needed in deeply-nested child controllers

```tsx
import { useModule } from "../..";

export function ClockController() {
  const { stores, services } = useModule();

  // Use them ...

  useEffect(() => {
    services.buttonListener.doStuff();
  });

  const currentTime = useRxState(stores.timer.time$);

  return <Clock time={time} />;
}
```

## Using module props

You normally won't need to, but the props passed in to the module component from outside will be available...

... to controllers ...

```tsx
import { useModule } from "../..";

export function ClockController() {
  const { moduleProps$ } = useModule();

  function handleClick() {
    moduleProps$.get().onClick(); // gets the "onClick" prop passed in to the module itself and calls it
  }

  // ...
}
```

... and to `createServices` and `createStores` if you need them

```tsx
import { ReadonlyAtom } from "@ixd-group/rx-utils";
import { Props } from ".";

export const createStores = (moduleProps$: ReadonlyAtom<Props>) => ({
  timer: new TimerStore(moduleProps$.get().initialTime),
  // ...
});
```
