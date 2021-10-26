import { ReadonlyAtom } from "@ixd-group/rx-utils";
import React from "react";

type ModuleData = {
  stores: unknown;
  services: unknown;
  moduleProps$: ReadonlyAtom<unknown>;
};

export const ModuleContext = React.createContext<ModuleData | null>(null);
