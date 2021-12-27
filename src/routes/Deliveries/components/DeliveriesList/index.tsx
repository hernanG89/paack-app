import React, { useCallback, useMemo } from "react";
import { FlatList, View, ListRenderItem, StyleProp, ViewProps } from "react-native";

import DeliveryItem from "./DeliveryItem";
import { layoutStyles } from "./styles";
import { Delivery } from "../../../../store/types";

const Constants = {
  flatlist: { maxToRenderPerBatch: 7, windowsSize: 3 },
};

const keyExtractor = (item: Delivery): string => item.id;

const Separator = (): JSX.Element => <View style={layoutStyles.separator} />;

type DeliveriesListProps = {
  deliveries: Delivery[];
  onDeliveryPress: (delivery: Delivery) => void;
  activeDelivery: Delivery | null;
  containerStyle?: StyleProp<ViewProps>;
  contentContainerStyle?: StyleProp<ViewProps>;
};

const DeliveriesList = ({
  deliveries,
  onDeliveryPress,
  activeDelivery,
  containerStyle,
  contentContainerStyle,
}: DeliveriesListProps): JSX.Element => {
  const renderItem: ListRenderItem<Delivery> = useCallback(
    ({ item }): JSX.Element => {
      return (
        <DeliveryItem
          delivery={item}
          onDeliveryPress={onDeliveryPress}
          isActiveDelivery={activeDelivery?.id === item.id}
        />
      );
    },
    [onDeliveryPress, activeDelivery],
  );

  const styles = useMemo(() => [layoutStyles.container, containerStyle], [containerStyle]);
  const contentContainerStyles = useMemo(
    () => [layoutStyles.contentContainer, contentContainerStyle],
    [contentContainerStyle],
  );

  return (
    <FlatList
      style={styles}
      data={deliveries}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      keyExtractor={keyExtractor}
      contentContainerStyle={contentContainerStyles}
      maxToRenderPerBatch={Constants.flatlist.maxToRenderPerBatch}
      windowSize={Constants.flatlist.windowsSize}
    />
  );
};

export default DeliveriesList;
