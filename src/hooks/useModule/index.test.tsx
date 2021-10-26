import { useInitModule } from "../useInitModule";
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import uniq from "lodash/uniq";
import { useModule as useMod, UseModule } from ".";
import { useRxState } from "../useRxState";
import { ReadonlyAtom } from "@ixd-group/rx-utils";

describe("useModule", () => {
  type Props = { pageId: string; ChildController: () => JSX.Element | null };
  const createStores = (moduleProps$: ReadonlyAtom<Props>) => ({
    someStore: "yay from store",
    pageIdUpperCase$: moduleProps$.map((p) => p.pageId.toUpperCase()),
  });
  const createServices = (moduleProps$: ReadonlyAtom<Props>) => ({
    someService: "yoy from service",
    pageIdLowerCase$: moduleProps$.map((p) => p.pageId.toLowerCase()),
  });
  type CreateStores = typeof createStores;
  type CreateServices = typeof createServices;

  const useModule: UseModule<CreateStores, CreateServices, Props> = useMod;

  const ModuleComponent = (props: Props) => {
    const { Provider } = useInitModule({ createStores, createServices, props });
    const { ChildController } = props;

    return (
      <Provider>
        <ChildController />
      </Provider>
    );
  };

  describe("when the service hasn't been provided", () => {
    const OrphanChildController = () => {
      useModule();
      return null;
    };

    it("raises if the service hasn't been provided", () => {
      jest.spyOn(console, "error").mockImplementation(() => {});
      expect(() => {
        render(<OrphanChildController />);
      }).toThrowError(
        "Expected a higher up component to provide the ModuleContext"
      );
    });
  });

  describe("moduleProps$", () => {
    it("gives access to moduleProps$", () => {
      const Controller = () => {
        const { moduleProps$ } = useModule();
        const { pageId } = useRxState(moduleProps$);
        return <div data-testid="test">Page ID is {pageId}</div>;
      };
      const { getByTestId, rerender } = render(
        <ModuleComponent pageId="pageIDOne" ChildController={Controller} />
      );
      expect(getByTestId("test")).toContainHTML("Page ID is pageIDOne");
      rerender(
        <ModuleComponent pageId="pageIDTwo" ChildController={Controller} />
      );
      expect(getByTestId("test")).toContainHTML("Page ID is pageIDTwo");
    });
  });

  describe("stores", () => {
    it("gives access to the stores", () => {
      const Controller = () => {
        const { stores } = useModule();
        return <div data-testid="test">{stores.someStore}</div>;
      };
      const { getByTestId } = render(
        <ModuleComponent pageId="testPageId" ChildController={Controller} />
      );
      expect(getByTestId("test")).toContainHTML("yay from store");
    });

    it("always returns the same stores object", () => {
      const objects: any[] = [];
      const Controller = () => {
        const { stores } = useModule();
        objects.push(stores);
        return null;
      };
      const { rerender } = render(
        <ModuleComponent pageId="testPageId" ChildController={Controller} />
      );
      rerender(
        <ModuleComponent pageId="testPageId" ChildController={Controller} />
      );
      expect(objects.length).toEqual(2);
      expect(uniq(objects).length).toEqual(1);
    });

    it("allows using module props in the createStores function", () => {
      const Controller = () => {
        const { stores } = useModule();
        const pageIdUpperCase = useRxState(stores.pageIdUpperCase$);
        return <div data-testid="test">PAGE ID IS {pageIdUpperCase}</div>;
      };
      const { rerender, getByTestId } = render(
        <ModuleComponent pageId="pageIdOne" ChildController={Controller} />
      );
      expect(getByTestId("test")).toContainHTML("PAGE ID IS PAGEIDONE");
      rerender(
        <ModuleComponent pageId="pageIdTwo" ChildController={Controller} />
      );
      expect(getByTestId("test")).toContainHTML("PAGE ID IS PAGEIDTWO");
    });
  });

  describe("services", () => {
    it("gives access to the services", () => {
      const Controller = () => {
        const { services } = useModule();
        return <div data-testid="test">{services.someService}</div>;
      };
      const { getByTestId } = render(
        <ModuleComponent pageId="testPageId" ChildController={Controller} />
      );
      expect(getByTestId("test")).toContainHTML("yoy from service");
    });

    it("always returns the same services object", () => {
      const objects: any[] = [];
      const Controller = () => {
        const { services } = useModule();
        objects.push(services);
        return null;
      };
      const { rerender } = render(
        <ModuleComponent pageId="testPageId" ChildController={Controller} />
      );
      rerender(
        <ModuleComponent pageId="testPageId" ChildController={Controller} />
      );
      expect(objects.length).toEqual(2);
      expect(uniq(objects).length).toEqual(1);
    });

    it("allows using module props in the createServices function", () => {
      const Controller = () => {
        const { services } = useModule();
        const pageIdLowerCase = useRxState(services.pageIdLowerCase$);
        return <div data-testid="test">page id is {pageIdLowerCase}</div>;
      };
      const { rerender, getByTestId } = render(
        <ModuleComponent pageId="pageIdOne" ChildController={Controller} />
      );
      expect(getByTestId("test")).toContainHTML("page id is pageidone");
      rerender(
        <ModuleComponent pageId="pageIdTwo" ChildController={Controller} />
      );
      expect(getByTestId("test")).toContainHTML("page id is pageidtwo");
    });
  });
});
