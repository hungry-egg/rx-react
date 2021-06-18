# `useButtons`

Registers button handlers for a given buttonHandler (up to you to provide, e.g. put on context, etc.).
The buttonHandler should be shared between the entire app.

```tsx
import { useServices, useButtons } from "@ixd-group/react-utils";
import { Services } from "../../services";

const MyComponentController = ({ isFocused }: { isFocused: boolean }) => {
  // This example gets the button handler from services
  const { buttonHandler } = useServices<Services>();

  useButtons(
    ["path", "to", "register", "under"],
    buttonHandler,
    isFocused, // boolean that says whether these callbacks are enabled or not
    {
      LEFT: () => doSomethingWhenLeftIsPressed(),
      RIGHT: () => doSomethingElse(),
    }
  );
};
```

**IMPORTANT** - the `path` parameter is used as a lookup for event bubbling.

For example, if:

- one component registers a `LEFT` callback under the path `["home"]`
- another component registers a `LEFT` callback under the path `["home", "pages", "1"]`

then when `LEFT` is pressed, the paths are traversed from the bottom up, i.e.

- `["home", "pages", "1"]` comes before
- `["home"]`

so the one registered under `["home", "pages", "1"]` is the one that gets called.

It is up to the user to make sure the paths are correctly named / configured.
