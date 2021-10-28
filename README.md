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

## Modules

It's often desirable to create self-contained React components called "modules", which from the outside look like a dumb React component, but inside includes a whole sub-tree of interacting components, and can be thought of as a complete mini-app in one component.

An obvious candidate for this is a "page" (e.g. a show page, with its own component tree and state shared between the whole page).

A "module" has the following characteristics:

- from the outside, it looks just like a dumb presentational component, whose interface is only props (no context)
- it has its own subtree of components, which are either
  - dumb (props-only) presentational components, e.g. `SideBar` with no app logic
  - controllers, which have no styles, but do have logic, e.g. `SideBarController` and only return one thing: their namesake equivalent presentational component, e.g. `SideBar`
- it has its own list of stores, shared between all its descendant controllers for maintaining state
- it has its own list of services (e.g. an api client, a remote control button listener), shared between all its descendant controllers
- its props can be accessed by its descendant controllers

- [createModule](./src/utils/createModule) create a module, whose descendants can access its stores, services and props

## Hooks

- [useAtom](./src/hooks/useAtom) convert some (changing) value in a React component into a ReadonlyAtom
  The opposite of `useRxState`

- [useRxState](./src/hooks/useRxState) unwraps a stateful Rx Observable
  The opposite of `useAtom`

- [useButtons](./src/hooks/useButtons) simple wrapper for the `ButtonHandler` component in the `common-services` library.

- [useSubscribe](./src/hooks/useSubscribe) subscribes to any Rx Observable

- [useModule](./src/hooks/useModule) access stores, services and module props from the containing module
