import { ReadonlyAtom } from "@ixd-group/rx-utils";
import { useContext } from "react";
import { ModuleContext } from "../../contexts/ModuleContext";

type CreateFunction<TProps> = (moduleProps$: ReadonlyAtom<TProps>) => unknown;

export type UseModule<
  TCreateStores extends CreateFunction<TProps>,
  TCreateServices extends CreateFunction<TProps>,
  TProps
  > = () => {
    stores: ReturnType<TCreateStores>,
    services: ReturnType<TCreateServices>,
    moduleProps$: ReadonlyAtom<TProps>,
  };


export const useModule: UseModule<CreateFunction<any>, CreateFunction<any>, any> = () => {
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error(
      "Expected a higher up component to provide the ModuleContext"
    );
  }
  return context;
};
