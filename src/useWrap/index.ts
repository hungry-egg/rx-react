import { BehaviorSubject } from "rxjs";
import { useEffect, useState } from "react";

export const useWrap = <T>(value: T) => {
  const [[bs, observable], _] = useState(() => {
    const bs = new BehaviorSubject<T>(value);
    return [bs, bs.asObservable()];
  });

  useEffect(() => {
    bs.next(value);
  }, [bs, value]);

  return observable;
};
