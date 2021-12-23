require("jest-fetch-mock").enableMocks();

import "isomorphic-fetch";
import { default as AbortController } from "abort-controller";
Object.assign(globalThis, {
  AbortController,
});
