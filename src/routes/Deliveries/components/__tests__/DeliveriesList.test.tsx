import * as React from "react";
import { render } from "@testing-library/react-native";

import DeliveriesList from "../DeliveriesList";
import testIds from "../DeliveriesList/testIds";
import { deliveries } from "../../../../store/services/deliveries/mockedData";

describe("DeliveriesList", () => {
  test("Should render deliveries", () => {
    const onDeliveryPress = jest.fn();

    const { getAllByTestId } = render(
      <DeliveriesList
        deliveries={deliveries}
        onDeliveryPress={onDeliveryPress}
        activeDelivery={null}
      />,
    );

    const components = getAllByTestId(new RegExp(testIds.DELIVERY_ITEM_CONTAINER_));

    expect(components.length).toBe(deliveries.length);
  });
});
