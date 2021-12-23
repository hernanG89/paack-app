import { delivery } from "../../services/deliveries/mockedData";
import driver, { initialState, setActiveDelivery, removeActiveDelivery } from "../driver";

test("Should return the initial state", () => {
  expect(driver(undefined, { type: "" })).toEqual(initialState);
});

test("The active delivery should be stored", () => {
  expect(driver(initialState, setActiveDelivery(delivery))).toEqual({ activeDelivery: delivery });
});

test("The active delivery should be removed", () => {
  const previousState = {
    activeDelivery: delivery,
  };

  expect(driver(previousState, removeActiveDelivery())).toEqual({ activeDelivery: null });
});
