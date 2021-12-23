import React from "react";
import { Button, StatusBar, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { layoutStyles } from "./styles";

const DeliveryDetails = (): JSX.Element => {
  const { goBack } = useNavigation();
  return (
    <View style={layoutStyles.container}>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <Button title="GoBack" onPress={() => goBack()} />
    </View>
  );
};

export default DeliveryDetails;
