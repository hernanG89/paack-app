export type FinishDeliveryBody = {
  deliveryId: string;
  status: "delivered" | "undelivered";
  latitude: number;
  longitude: number;
};
