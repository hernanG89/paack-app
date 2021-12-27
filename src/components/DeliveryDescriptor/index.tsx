import React from "react";
import { View, Text } from "react-native";

import { Delivery } from "../../store/types";
import locales from "../../locales/delivery-descriptor";
import testIds from "./testIds";

type DeliveryDescriptorProps = {
  delivery: Delivery;
};

const DeliveryDescriptor = ({ delivery }: DeliveryDescriptorProps): JSX.Element => {
  return (
    <View testID={`${testIds.DELIVERY_DESCRIPTOR_CONTAINER_}${delivery.id}`}>
      <Text>{`${locales.package}${delivery.id}`}</Text>
      <Text>{`${locales.city}${delivery.city}`}</Text>
      <Text>{`${locales.address}${delivery.address}`}</Text>
      <Text>{`${locales.zipCode} ${delivery.zipCode}`}</Text>
      <Text>{`${locales.customer}${delivery.customer}`}</Text>
    </View>
  );
};

export default DeliveryDescriptor;
