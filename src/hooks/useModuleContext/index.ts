import { useContext } from "react";
import { ModuleContext } from "../../contexts/ModuleContext";

export const useModuleContext = () => {
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error(
      "Expected a higher up component to provide the ModuleContext"
    );
  }
  return context;
};
