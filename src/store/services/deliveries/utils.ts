import { FinishDeliveryBody } from "./types";
import { Delivery } from "../../types";

export const buildFinishDeliveryBody = (
  delivery: Delivery,
  delivered: boolean,
): FinishDeliveryBody => ({
  deliveryId: delivery.id,
  status: delivered ? "delivered" : "undelivered",
  latitude: delivery.latitude,
  longitude: delivery.longitude,
});
