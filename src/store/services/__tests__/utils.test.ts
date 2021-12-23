import { FinishDeliveryBody } from "../deliveries/types";
import { buildFinishDeliveryBody } from "../deliveries/utils";
import { delivery } from "../deliveries/mockedData";

describe("buildFinishDeliveryBody", () => {
  test("Return schema", () => {
    const delivered = true;
    const expectedBody: FinishDeliveryBody = {
      deliveryId: delivery.id,
      status: delivered ? "delivered" : "undelivered",
      latitude: delivery.latitude,
      longitude: delivery.longitude,
    };

    const body = buildFinishDeliveryBody(delivery, delivered);

    expect(body).toMatchObject(expectedBody);
  });

  test("Delivered package status", () => {
    const body = buildFinishDeliveryBody(delivery, true);

    expect(body.status).toBe("delivered");
  });

  test("Undelivered package status", () => {
    const body = buildFinishDeliveryBody(delivery, false);

    expect(body.status).toBe("undelivered");
  });
});
