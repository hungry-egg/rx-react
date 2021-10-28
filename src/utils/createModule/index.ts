import React, { useMemo } from "react";
import { ModuleContext } from "../../contexts/ModuleContext";
import { useModule, UseModule, CreateFunction } from "../../hooks/useModule";
import { useAtom } from "../../hooks/useAtom";

export const createModule = <
  TProps,
  TCreateStores extends CreateFunction<TProps>,
  TCreateServices extends CreateFunction<TProps>
>({
  createStores,
  createServices,
  root,
}: {
  createStores: TCreateStores;
  createServices: TCreateServices;
  root: React.ComponentType;
}) => {
  const RootComponent = root;

  const Component = (props: TProps) => {
    const moduleProps$ = useAtom(props);
    const stores = useMemo(() => createStores(moduleProps$), []);
    const services = useMemo(() => createServices(moduleProps$), []);


    return React.createElement(
      ModuleContext.Provider,
      { value: { stores, services, moduleProps$ } },
      [React.createElement(RootComponent)]
    );
  };

  return [Component, useModule] as [
    React.ComponentType<TProps>,
    UseModule<TCreateStores, TCreateServices, TProps>
  ];
};
