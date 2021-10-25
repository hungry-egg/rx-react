import { ReadonlyAtom } from "@ixd-group/rx-utils";
import React, { ReactNode, useMemo } from "react";
import { useAtom } from "../useAtom";
import { ModuleContext } from "../../contexts/ModuleContext";

export const useInitModule = <TProps>({
  createStores,
  createServices,
  props,
}: {
  createStores: (moduleProps: ReadonlyAtom<TProps>) => unknown;
  createServices: (moduleProps: ReadonlyAtom<TProps>) => unknown;
  props: TProps;
}) => {
  const moduleProps$ = useAtom(props);
  const stores = useMemo(() => createStores(moduleProps$), []);
  const services = useMemo(() => createServices(moduleProps$), []);
  const Provider = useMemo(
    () =>
      function Provider({ children }: { children: ReactNode; }) {
        return React.createElement(
          ModuleContext.Provider,
          { value: { stores, services, moduleProps$ } },
          children
        );
      },
    []
  );
  return { stores, services, moduleProps$, Provider };
};
