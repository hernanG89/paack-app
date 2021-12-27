/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import { fireEvent } from "@testing-library/react-native";

import DeliveryDetails from "../index";
import { renderWithRedux } from "../../../store/testUtils/renderWithRedux";
import { setupApiStore } from "../../../store/testUtils";
import deliveriesService from "../../../store/services/deliveries";
import driverReducer from "../../../store/slices/driver";
import testIds from "../testIds";
import { deliveries, delivery } from "../../../store/services/deliveries/mockedData";

const { store } = setupApiStore(deliveriesService, {
  driver: driverReducer,
});

// Mocks like this need to be configured at the top level
// of the test file, they can't be setup inside your tests.
jest.mock("@react-navigation/native", () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const actualNav = jest.requireActual("@react-navigation/native");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...actualNav,
    useRoute: () => ({
      params: {
        deliveryId: "1",
      },
    }),
  };
});

const mockedDeliveries = deliveries;
const mockedDelivery = delivery;
jest.mock("../../../store/hooks/delivery", () => {
  return {
    ...jest.requireActual("../../../store/hooks/delivery"),
    useDeliveryById: () => ({ ...mockedDelivery }),
  };
});

jest.mock("../../../store/hooks/driver", () => ({
  useActiveDelivery: jest.fn(),
}));
import { useActiveDelivery } from "../../../store/hooks/driver";

describe("DeliveryDetails", () => {
  test("Should render the container ", () => {
    const { getByTestId } = renderWithRedux(<DeliveryDetails />, store);

    const container = getByTestId(testIds.DELIVERY_DETAILS_CONTAINER);

    expect(container).toBeDefined();
  });

  test("With no active delivery, make active cta should be enabled", () => {
    useActiveDelivery.mockImplementationOnce(() => null);
    const { getByTestId } = renderWithRedux(<DeliveryDetails />, store);

    const makeActiveBtn = getByTestId(testIds.DELIVERY_DETAILS_MAKE_ACTIVE_BUTTON);

    expect(makeActiveBtn).toBeEnabled();
  });

  test("With an active delivery, make active cta should be disabled", () => {
    useActiveDelivery.mockImplementationOnce(() => ({ ...mockedDelivery }));
    const { getByTestId } = renderWithRedux(<DeliveryDetails />, store);

    const makeActiveBtn = getByTestId(testIds.DELIVERY_DETAILS_MAKE_ACTIVE_BUTTON);
    expect(makeActiveBtn).toBeDisabled();
  });

  test("If the active delivery it's the current delivery, it should show the other ctas", () => {
    useActiveDelivery.mockImplementationOnce(() => ({ ...mockedDelivery }));
    const { getByTestId } = renderWithRedux(<DeliveryDetails />, store);

    const markAsDeliveredBtn = getByTestId(testIds.DELIVERY_DETAILS_MARK_AS_DELIVERED_BUTTON);
    const markAsUndeliveredBtn = getByTestId(testIds.DELIVERY_DETAILS_MARK_AS_UNDELIVERED_BUTTON);

    expect(markAsDeliveredBtn).toBeDefined();
    expect(markAsUndeliveredBtn).toBeDefined();
  });

  test("If the active delivery it's not the current delivery details, it shouldn't show the other ctas", () => {
    useActiveDelivery.mockImplementationOnce(() => ({ ...mockedDeliveries[2] }));
    const { queryByTestId } = renderWithRedux(<DeliveryDetails />, store);

    const markAsDeliveredBtn = queryByTestId(testIds.DELIVERY_DETAILS_MARK_AS_DELIVERED_BUTTON);
    const markAsUndeliveredBtn = queryByTestId(testIds.DELIVERY_DETAILS_MARK_AS_UNDELIVERED_BUTTON);

    expect(markAsDeliveredBtn).toBe(null);
    expect(markAsUndeliveredBtn).toBe(null);
  });

  test("By pressing make active btn, the delivery should be set as active delivery in the store", () => {
    useActiveDelivery.mockRestore();
    const { getByTestId } = renderWithRedux(<DeliveryDetails />, store);

    const makeActiveBtn = getByTestId(testIds.DELIVERY_DETAILS_MAKE_ACTIVE_BUTTON);

    expect(store.getState().driver.activeDelivery).toBe(null);

    fireEvent.press(makeActiveBtn);

    expect(store.getState().driver.activeDelivery).toStrictEqual(mockedDelivery);
  });
});
