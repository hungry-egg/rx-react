import React from "react";
import { useInitModule } from "../hooks/useInitModule";
import { useModule, UseModule, CreateFunction } from "../hooks/useModule";

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
  root: React.ElementType;
}) => {
  const RootComponent = root;

  const Component = (props: TProps) => {
    const { Provider } = useInitModule({ createStores, createServices, props });

    return React.createElement(
      Provider,
      null,
      [React.createElement(RootComponent)]
    );
  };

  return [Component, useModule] as [
    React.ElementType,
    UseModule<TCreateStores, TCreateServices, TProps>
  ];
};
