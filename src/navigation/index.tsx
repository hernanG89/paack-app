import React from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransitionPresets } from "@react-navigation/stack";
import "react-native-gesture-handler";

import routes from "../routes";
import Deliveries from "../routes/Deliveries";
import DeliveryDetails from "../routes/DeliveryDetails";

export type RootStackParamList = {
  [routes.DELIVERIES]: undefined;
  [routes.DELIVERY_DETAILS]: { deliveryId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const navigatorOptions = {
  headerStyle: {
    backgroundColor: "white",
  },
  headerTitleAlign: "center",
};

const screenOptions = {
  gestureEnabled: false,
  ...Platform.select({
    ios: { ...TransitionPresets.ModalSlideFromBottomIOS },
    android: { ...TransitionPresets.RevealFromBottomAndroid },
  }),
};

function AppContent() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routes.DELIVERIES} screenOptions={navigatorOptions}>
        <Stack.Screen name={routes.DELIVERIES} component={Deliveries} options={screenOptions} />
        <Stack.Screen
          name={routes.DELIVERY_DETAILS}
          component={DeliveryDetails}
          options={screenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppContent;
