import { useRef, useEffect } from "react";
import { Observable } from "rxjs";
import { Subscribable } from "@hungry-egg/rx-state";

type Callback<T> = (value: T) => void;

export function useSubscribe<T>(
  observable$: Observable<T> | Subscribable<T>,
  callback: Callback<T>
) {
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  useEffect(() => {
    const subscription = observable$.subscribe((value) => {
      callbackRef.current(value);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
}
