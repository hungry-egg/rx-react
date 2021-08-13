import { useEffect } from "react";
import {
  Button,
  ButtonHandler,
  EventBubblerCallback,
} from "@ixd-group/common-services";
import { useAtom } from "../useAtom";

export const useButtons = (
  path: string[],
  buttonHandler: ButtonHandler,
  enabled: boolean,
  callbacks: Partial<{ [Btn in Button]: EventBubblerCallback }>
) => {
  const enabled$ = useAtom(enabled);
  useEffect(() => {
    const { unregister } = buttonHandler.register({
      path,
      callbacks,
      enabled$,
    });
    return function () {
      unregister();
    };
  }, [buttonHandler, callbacks, enabled$, path]);
};
