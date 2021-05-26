# `ModuleContext`

A "module" is a _self-contained React component_ that _has its own lookup of stores and services_, and _interacts with the outside world only via props_.

A module should provide its own `ModuleContext`, then child components can use `useStores` and `useServices` to pluck whichever stores/services they need.

Usage:

### `src/myModule/stores.ts`

```tsx
export const createStores = () => ({
  timer: new TimerStore(),
  // ...
});

export type Stores = ReturnType<typeof createStores>;
```

### `src/myModule/services.ts`

```tsx
export const createServices = () => ({
  buttonListener: new ButtonListener(),
  // ...
});

export type Services = ReturnType<typeof createServices>;
```

### `src/myModule/index.ts` (the module component itself)

Create the stores and services at the module level, memoize them and provide them
to child components.

```tsx
import { useMemo } from "react";
import { ModuleContext } from "@ixd-group/react-utils";
import { createStores } from "./stores";
import { createServices } from "./services";

export function MyModule () {
  const stores = useMemo(createStores, []);
  const services = useMemo(createServices, []);

  // ...

  return (
    <ModuleContext.Provider value={{ stores, services }}>
      {/* ... */}
    </ModuleContext.Provider>
}
```

### `src/myModule/components/ClockController.ts` (some child component)

Consume stores / services needed

```tsx
import { useStores, useServices } from "@ixd-group/react-utils";
import { Stores } from "../stores";
import { Services } from "../services";

export function ClockController() {
  const { timer } = useStores<Stores>();
  const { buttonListener } = useServices<Services>();

  // use them ...
}
```
