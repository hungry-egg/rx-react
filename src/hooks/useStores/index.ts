import { BasicLookup } from "../../contexts/ModuleContext";
import { useModuleContext } from "../useModuleContext";

export const useStores = <TStores extends BasicLookup>(): TStores => {
  const context = useModuleContext();
  return context.stores as TStores;
};
