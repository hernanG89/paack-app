import { StyleSheet } from "react-native";

export const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: { padding: 16 },
  separator: { paddingVertical: 16 },
  itemContainer: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ccc",
    backgroundColor: "white",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});

export const activeItemContainerStyle = { ...layoutStyles.itemContainer, borderColor: "green" };
