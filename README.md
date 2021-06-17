# React Utils

Helpers for building prototypes using React.
State management utilities based on RxJS

## Build

    yarn build

## Build on file change

    yarn watch

## Test

    yarn test

## Publish the npm package

    yarn publish

## Hooks

- [useAtom](./src/hooks/useAtom) convert some (changing) value in a React component into a ReadonlyAtom
  The opposite of `useRxState`

- [useRxState](./src/hooks/useRxState) unwraps a stateful Rx Observable
  The opposite of `useAtom`

- [useSubscribe](./src/hooks/useSubscribe) subscribes to any Rx Observable

- [useStores](./src/hooks/useStores) use stores provided on the containing "module"

- [useServices](./src/hooks/useServices) use services provided on the containing "module"
