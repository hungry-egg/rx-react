import { useState, useEffect, useMemo } from "react";
import { isObservable } from "rxjs";
import {
  combine,
  isAtom,
  get,
  Subscribable,
  ObservableLookup,
  ObservableTuple,
  UnwrapObservable,
  UnwrapObservableLookup,
  UnwrapObservableTuple,
} from "@hungry-egg/rx-state";

type State = Subscribable | ObservableTuple | ObservableLookup;
type StateFunction = () => State;

function isSubscribable(state: State): state is Subscribable {
  return isAtom(state) || isObservable(state);
}

// Signature with single observable
export function useUnwrap<TState extends Subscribable>(
  state$: TState | (() => TState)
): UnwrapObservable<TState>;

// Signature with lookup
export function useUnwrap<TState extends ObservableLookup>(
  stateLookup: TState | (() => TState)
): UnwrapObservableLookup<TState>;

// Signature with tuple
export function useUnwrap<TState extends ObservableTuple>(
  stateTuple: TState | (() => TState)
): UnwrapObservableTuple<TState>;

// Implementation
export function useUnwrap(arg: State | StateFunction) {
  const state$ = useMemo(() => {
    const state = typeof arg === "function" ? arg() : arg;
    return isSubscribable(state)
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
