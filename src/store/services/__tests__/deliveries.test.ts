/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import fetchMock from "jest-fetch-mock";

import { setupApiStore } from "../../testUtils";
import deliveriesService, { baseUrl } from "../deliveries";
import { deliveries, delivery } from "../deliveries/mockedData";

beforeEach((): void => {
  fetchMock.resetMocks();
});
const storeRef = setupApiStore(deliveriesService);

describe("GetDeliveries", () => {
  test("Request it's correct", async () => {
    fetchMock.mockResponse(JSON.stringify([]));

    await storeRef.store.dispatch<any>(deliveriesService.endpoints.getDeliveries.initiate());

    expect(fetchMock).toBeCalledTimes(1);
    const { method, url } = fetchMock.mock.calls[0][0] as Request;

    expect(method).toBe("GET");
    expect(url).toBe(`${baseUrl}deliveries`);
  });

  test("Successful response", async () => {
    fetchMock.mockResponse(JSON.stringify(deliveries));

    const result = await storeRef.store.dispatch<any>(
      deliveriesService.endpoints.getDeliveries.initiate(),
    );

    expect(result.isSuccess).toBe(true);
    expect(result.data).toStrictEqual(deliveries);
  });

  test("Unsuccessful response", async () => {
    const errorMessage = "Internal Server Error";
    fetchMock.mockReject(new Error(errorMessage));

    const result = await storeRef.store.dispatch<any>(
      deliveriesService.endpoints.getDeliveries.initiate(),
    );

    expect(result.isError).toBe(true);
  });
});

describe("FinishDelivery", () => {
  test("Request it's correct", async () => {
    fetchMock.mockResponse(JSON.stringify({ delivery }));
    await storeRef.store.dispatch<any>(
      deliveriesService.endpoints.finishDelivery.initiate({ delivery, delivered: true }),
    );
    expect(fetchMock).toBeCalledTimes(1);

    const { method, url } = fetchMock.mock.calls[0][0] as Request;
    expect(method).toBe("POST");
    expect(url).toBe(`${baseUrl}finishDelivery`);
  });

  test("Successful response", async () => {
    fetchMock.mockResponse(JSON.stringify({ delivery }));

    const result = await storeRef.store.dispatch<any>(
      deliveriesService.endpoints.finishDelivery.initiate({ delivery, delivered: true }),
    );

    expect(result.data).toBeDefined();
  });

  test("Unsuccessful response", async () => {
    const errorMessage = "Internal Server Error";
    fetchMock.mockReject(new Error(errorMessage));

    const result = await storeRef.store.dispatch<any>(
      deliveriesService.endpoints.finishDelivery.initiate({ delivery, delivered: true }),
    );
    expect(result.error).toBeDefined();
  });
});
