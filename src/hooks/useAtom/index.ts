import { readonlyAtom } from "@ixd-group/rx-utils";
import { useEffect, useState } from "react";

export const useAtom = <T>(value: T) => {
  const [[theAtom, setValue]] = useState(() => readonlyAtom(value));

  useEffect(() => {
    setValue(value);
  }, [theAtom, value]);

  return theAtom;
};
