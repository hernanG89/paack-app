import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, StatusBar, View } from "react-native";

import { layoutStyles } from "./styles";

import routes from "../index";

const Deliveries = (): JSX.Element => {
  const { navigate } = useNavigation();
  return (
    <View style={layoutStyles.container}>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <Button title="DeliveryDetails" onPress={() => navigate({ name: routes.DELIVERY_DETAILS })} />
    </View>
  );
};

export default Deliveries;
