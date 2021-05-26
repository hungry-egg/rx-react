import { BasicLookup } from "../../contexts/ModuleContext";
import { useModuleContext } from "../useModuleContext";

export const useServices = <TServices extends BasicLookup>(): TServices => {
  const context = useModuleContext();
  return context.services as TServices;
};
