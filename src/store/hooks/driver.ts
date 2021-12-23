import { Delivery } from "../types";
import useAppSelector from "./useAppSelector";

export const useActiveDelivery = (): Delivery | null => {
  const activeDelivery = useAppSelector((state) => state.driver.activeDelivery);
  return activeDelivery || null;
};

export default { useActiveDelivery };
