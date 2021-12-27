import React, { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, Button, StatusBar, Text, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";

import DeliveryDescriptor from "../../components/DeliveryDescriptor";
import { layoutStyles } from "./styles";
import locales from "../../locales/delivery-details";
import { useActiveDelivery } from "../../store/hooks/driver";
import { useDeliveryById } from "../../store/hooks/delivery";
import useAppDispatch from "../../store/hooks/useAppDispatch";
import { removeActiveDelivery, setActiveDelivery } from "../../store/slices/driver";
import { useFinishDeliveryMutation } from "../../store/services/deliveries";
import { RootStackParamList } from "../../navigation";
import testIds from "./testIds";

type RouteProps = RootStackParamList["DELIVERY_DETAILS"];

const DeliveryDetails = (): JSX.Element => {
  const { params: routeParams } = useRoute<RouteProp<Record<string, RouteProps>, string>>();

  const [delivered, setDelivered] = useState<boolean>(false);

  const delivery = useDeliveryById(routeParams.deliveryId);

  const activeDelivery = useActiveDelivery();

  const appDispatch = useAppDispatch();
  const onActiveDeliveryPress = useCallback(() => {
    if (delivery) {
      appDispatch(setActiveDelivery(delivery));
    }
  }, [appDispatch, delivery]);

  const [finishDelivery, { isLoading: isUpdatingDelivery }] = useFinishDeliveryMutation();

  const onDeliveredPress = useCallback(() => {
    if (delivery) {
      void finishDelivery({ delivery, delivered: true })
        .catch((e) => console.log("Error:", e))
        .then(() => {
          setDelivered(true);
          appDispatch(removeActiveDelivery());
        });
    }
  }, [finishDelivery, delivery, appDispatch]);

  const onUndeliveredPress = useCallback(() => {
    if (delivery) {
      void finishDelivery({ delivery, delivered: false })
        .catch((e) => console.log("Error:", e))
        .then(() => {
          appDispatch(removeActiveDelivery());
        });
    }
  }, [finishDelivery, delivery, appDispatch]);

  const isActiveDelivery = useMemo(
    () => activeDelivery && activeDelivery.id === delivery?.id,
    [activeDelivery, delivery],
  );

  return (
    <View style={layoutStyles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      {delivery && (
        <View testID={testIds.DELIVERY_DETAILS_CONTAINER}>
          <View style={layoutStyles.detailsContainer}>
            <DeliveryDescriptor delivery={delivery} />
          </View>
          <Button
            testID={testIds.DELIVERY_DETAILS_MAKE_ACTIVE_BUTTON}
            title={locales.activeDeliveryCTA}
            onPress={onActiveDeliveryPress}
            disabled={!!activeDelivery || delivered}
          />
          <Text>{JSON.stringify(activeDelivery)}</Text>

          {!!isActiveDelivery && (
            <View style={layoutStyles.actionContainer}>
              <Button
                testID={testIds.DELIVERY_DETAILS_MARK_AS_UNDELIVERED_BUTTON}
                title={locales.undeliveredCTA}
                onPress={onUndeliveredPress}
                disabled={isUpdatingDelivery}
                color={"red"}
              />
              <Button
                testID={testIds.DELIVERY_DETAILS_MARK_AS_DELIVERED_BUTTON}
                title={locales.deliveredCTA}
                onPress={onDeliveredPress}
                disabled={isUpdatingDelivery}
                color={"green"}
              />
            </View>
          )}
          {isUpdatingDelivery && <ActivityIndicator size={"large"} />}
        </View>
      )}
    </View>
  );
};

export default DeliveryDetails;
