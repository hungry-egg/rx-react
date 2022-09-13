import { useRef, useEffect } from "react";
import { Observable } from "rxjs";
import { StatefulObservable } from "@ixd-group/rx-utils";

type Callback<T> = (value: T) => void;

export function useSubscribe<T>(
  observable$: Observable<T> | StatefulObservable<T>,
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
