import * as React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";

import LoadingOrErrorWrapper from "../LoadingOrErrorWrapper";
import testIds from "../LoadingOrErrorWrapper/testIds";

const children = <Text>{"Test"}</Text>;

describe("LoadingOrErrorWrapper", () => {
  test("Should render the loading component", () => {
    const refetch = jest.fn();
    const { getByTestId } = render(
      <LoadingOrErrorWrapper data={null} error={false} loading={true} refetch={refetch}>
        {children}
      </LoadingOrErrorWrapper>,
    );

    const component = getByTestId(testIds.LOADING_CONTAINER);
    expect(component).toBeDefined();
  });

  test("Should render the error component", () => {
    const refetch = jest.fn();
    const { getByTestId } = render(
      <LoadingOrErrorWrapper data={null} error={true} loading={false} refetch={refetch}>
        {children}
      </LoadingOrErrorWrapper>,
    );

    const component = getByTestId(testIds.ERROR_CONTAINER);
    expect(component).toBeDefined();
  });

  test("Should trigger the refetch fn", () => {
    const refetch = jest.fn();
    const { getByTestId } = render(
      <LoadingOrErrorWrapper data={null} error={true} loading={false} refetch={refetch}>
        {children}
      </LoadingOrErrorWrapper>,
    );

    fireEvent.press(getByTestId(testIds.REFETCH_BUTTON));

    expect(refetch).toBeCalled();
  });

  test("Should render the children", () => {
    const refetch = jest.fn();
    const { getByTestId } = render(
      <LoadingOrErrorWrapper data={[]} error={false} loading={false} refetch={refetch}>
        {children}
      </LoadingOrErrorWrapper>,
    );

    const component = getByTestId(testIds.CHILDREN_CONTAINER);
    expect(component).toBeDefined();
  });
});
