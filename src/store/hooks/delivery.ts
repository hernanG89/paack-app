import deliveriesService from "../services/deliveries";
import { Delivery } from "../types";

export const useDeliveries = (): Delivery[] | null =>
  deliveriesService.endpoints.getDeliveries.useQueryState().data || null;

export const useDeliveryById = (deliveryId: string): Delivery | null => {
  const deliveries = useDeliveries();
  const delivery = deliveries?.find((delivery) => delivery.id === deliveryId);

  return delivery || null;
};

export default { useDeliveries, useDeliveryById };
