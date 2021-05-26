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

- [useRxState](./src/hooks/useRxState) unwraps a stateful Rx Observable

- [useSubscribe](./src/hooks/useSubscribe) subscribes to any Rx Observable

- [useStores](./src/hooks/useStores) use stores provided on the containing "module"

- [useServices](./src/hooks/useServices) use services provided on the containing "module"
