import React from "react";
import { ActivityIndicator, Button, View } from "react-native";

import { layoutStyles } from "./styles";
import locales from "../../locales/loading-or-error-wrapper";
import testIds from "./testIds";

type LoadingOrErrorWrapperProps<D> = {
  data: D;
  error: boolean;
  loading: boolean;
  refetch: () => void;
  children: React.ReactElement;
};

const LoadingOrErrorWrapper = <D,>({
  error,
  loading,
  refetch,
  children,
}: LoadingOrErrorWrapperProps<D>): JSX.Element => {
  if (loading && !error) {
    return (
      <View style={layoutStyles.container} testID={testIds.LOADING_CONTAINER}>
        {<ActivityIndicator size="large" />}
      </View>
    );
  }

  if (error) {
    return (
      <View style={layoutStyles.container} testID={testIds.ERROR_CONTAINER}>
        <Button title={locales.defaultError} onPress={refetch} testID={testIds.REFETCH_BUTTON} />
      </View>
    );
  }

  return (
    <View testID={testIds.CHILDREN_CONTAINER} style={layoutStyles.childrenContainer}>
      {children}
    </View>
  );
};

export default LoadingOrErrorWrapper;
