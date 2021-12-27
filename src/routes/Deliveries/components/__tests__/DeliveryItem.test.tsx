import * as React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import DeliveryItem from "../DeliveriesList/DeliveryItem";
import testIds from "../DeliveriesList/testIds";
import { activeItemContainerStyle, layoutStyles } from "../DeliveriesList/styles";
import { delivery } from "../../../../store/services/deliveries/mockedData";

const deliveryTestId = `${testIds.DELIVERY_ITEM_CONTAINER_}${delivery.id}`;

describe("DeliveryItem", () => {
  test("Should render the delivery", () => {
    const onDeliveryPress = jest.fn();

    const { getByTestId } = render(
      <DeliveryItem
        delivery={delivery}
        onDeliveryPress={onDeliveryPress}
        isActiveDelivery={false}
      />,
    );

    const component = getByTestId(deliveryTestId);
    expect(component).toBeDefined();
  });

  test("Should match default delivery styles ", () => {
    const onDeliveryPress = jest.fn();

    const { getByTestId } = render(
      <DeliveryItem
        delivery={delivery}
        onDeliveryPress={onDeliveryPress}
        isActiveDelivery={false}
      />,
    );

    const component = getByTestId(deliveryTestId);
    expect(component.props.style).toEqual(layoutStyles.itemContainer);
  });

  test("Should match active delivery styles ", () => {
    const onDeliveryPress = jest.fn();

    const { getByTestId } = render(
      <DeliveryItem
        delivery={delivery}
        onDeliveryPress={onDeliveryPress}
        isActiveDelivery={true}
      />,
    );

    const component = getByTestId(deliveryTestId);
    expect(component.props.style).toEqual(activeItemContainerStyle);
  });

  test("Should call the callback on press", () => {
    const onDeliveryPress = jest.fn();

    const { getByTestId } = render(
      <DeliveryItem
        delivery={delivery}
        onDeliveryPress={onDeliveryPress}
        isActiveDelivery={false}
      />,
    );

    fireEvent.press(getByTestId(`${testIds.DELIVERY_ITEM_BUTTON_}${delivery.id}`));
    expect(onDeliveryPress).toBeCalledWith(delivery);
  });
});
