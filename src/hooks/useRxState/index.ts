import { useState, useEffect, useMemo } from "react";
import { isObservable } from "rxjs";
import {
  combine,
  isAtom,
  get,
  StatefulObservable,
  ObservableLookup,
  ObservableTuple,
  UnwrapObservable,
  UnwrapObservableLookup,
  UnwrapObservableTuple,
} from "@ixd-group/rx-utils";

type State = StatefulObservable | ObservableTuple | ObservableLookup;
type StateFunction = () => State;

function isStatefulObservable(state: State): state is StatefulObservable {
  return isAtom(state) || isObservable(state);
}

// Signature with single observable
export function useRxState<TState extends StatefulObservable>(
  state$: TState | (() => TState)
): UnwrapObservable<TState>;

// Signature with lookup
export function useRxState<TState extends ObservableLookup>(
  stateLookup: TState | (() => TState)
): UnwrapObservableLookup<TState>;

// Signature with tuple
export function useRxState<TState extends ObservableTuple>(
  stateTuple: TState | (() => TState)
): UnwrapObservableTuple<TState>;

// Implementation
export function useRxState(arg: State | StateFunction) {
  const state$ = useMemo(() => {
    const state = typeof arg === "function" ? arg() : arg;
    return isStatefulObservable(state)
      ? state
      : Array.isArray(state) // this is just to keep typescript overloads happy
      ? combine(state)
      : combine(state);
  }, []);

  const [value, setValue] = useState(() => get(state$));

  useEffect(() => {
    const subscription = state$.subscribe((val) => setValue(val));
    return function cleanup() {
      subscription.unsubscribe();
    };
  }, []);

  return value;
}
