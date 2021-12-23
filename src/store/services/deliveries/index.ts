import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Delivery } from "../../types";
import { buildFinishDeliveryBody } from "./utils";

export const baseUrl = "https://60e84194673e350017c21844.mockapi.io/api/";

export const deliveriesService = createApi({
  reducerPath: "deliveries",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getDeliveries: builder.query<Delivery[], void>({
      query: (): string => `deliveries`,
    }),
    finishDelivery: builder.mutation<Delivery, { delivery: Delivery; delivered: boolean }>({
      query: ({ delivery, delivered }) => ({
        url: `finishDelivery`,
        method: "POST",
        body: buildFinishDeliveryBody(delivery, delivered),
      }),
    }),
  }),
});

export const { useGetDeliveriesQuery, useFinishDeliveryMutation } = deliveriesService;

export default deliveriesService;
