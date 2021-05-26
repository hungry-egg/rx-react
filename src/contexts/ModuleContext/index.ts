import React from "react";

export type BasicLookup = { [name: string]: unknown };

type ModuleType = {
  stores: BasicLookup;
  services: BasicLookup;
}

export const ModuleContext = React.createContext<ModuleType | null>(null);
