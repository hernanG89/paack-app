import { StyleSheet } from "react-native";

export const layoutStyles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  childrenContainer: { flex: 1 },
});
