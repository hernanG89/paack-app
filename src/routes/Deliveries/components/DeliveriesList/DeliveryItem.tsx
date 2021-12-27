import React, { useCallback } from "react";
import { View, TouchableOpacity } from "react-native";

import DeliveryDescriptor from "../../../../components/DeliveryDescriptor";
import { activeItemContainerStyle, layoutStyles } from "./styles";
import { Delivery } from "../../../../store/types";
import testIds from "./testIds";

type DeliveryItemProps = {
  delivery: Delivery;
  onDeliveryPress: (delivery: Delivery) => void;
  isActiveDelivery: boolean;
};

const DeliveryItem = ({
  delivery,
  onDeliveryPress,
  isActiveDelivery,
}: DeliveryItemProps): JSX.Element => {
  const onPress = useCallback(() => {
    onDeliveryPress(delivery);
  }, [onDeliveryPress, delivery]);

  return (
    <View
      style={isActiveDelivery ? activeItemContainerStyle : layoutStyles.itemContainer}
      testID={`${testIds.DELIVERY_ITEM_CONTAINER_}${delivery.id}`}
    >
      <TouchableOpacity onPress={onPress} testID={`${testIds.DELIVERY_ITEM_BUTTON_}${delivery.id}`}>
        <DeliveryDescriptor delivery={delivery} />
      </TouchableOpacity>
    </View>
  );
};

export default DeliveryItem;
