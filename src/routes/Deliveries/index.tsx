import React, { useCallback } from "react";
import { StatusBar, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { layoutStyles } from "./styles";

import routes from "..";
import { useGetDeliveriesQuery } from "../../store/services/deliveries";
import { Delivery } from "../../store/types";
import { RootStackParamList } from "../../navigation";
import LoadingOrErrorWrapper from "../../components/LoadingOrErrorWrapper";
import DeliveriesList from "./components/DeliveriesList";
import { useActiveDelivery } from "../../store/hooks/driver";

type DeliveriesProps = NativeStackScreenProps<RootStackParamList, "DELIVERIES">;

const Deliveries = ({ navigation }: DeliveriesProps): JSX.Element => {
  const { data = [], isFetching, error, refetch } = useGetDeliveriesQuery();

  const onDeliveryPress = useCallback(
    (item: Delivery) => {
      navigation.navigate(routes.DELIVERY_DETAILS, { deliveryId: item.id });
    },
    [navigation],
  );

  const activeDelivery = useActiveDelivery();

  return (
    <View style={layoutStyles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <LoadingOrErrorWrapper data={data} error={!!error} loading={isFetching} refetch={refetch}>
        <DeliveriesList
          deliveries={data}
          onDeliveryPress={onDeliveryPress}
          activeDelivery={activeDelivery}
        />
      </LoadingOrErrorWrapper>
    </View>
  );
};

export default Deliveries;
