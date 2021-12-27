import * as React from "react";
import { render } from "@testing-library/react-native";

import DeliveryDescriptor from "../DeliveryDescriptor";
import testIds from "../DeliveryDescriptor/testIds";
import { delivery } from "../../store/services/deliveries/mockedData";

describe("DeliveryDescriptor", () => {
  test("Should render the descriptor", () => {
    const { getByTestId } = render(<DeliveryDescriptor delivery={delivery} />);

    const deliveryRendered = getByTestId(`${testIds.DELIVERY_DESCRIPTOR_CONTAINER_}${delivery.id}`);
    expect(deliveryRendered).toBeDefined();
  });
});
