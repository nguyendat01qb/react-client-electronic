import axios from "../helpers/axios";
import { orderConstants } from "./constants";

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axios.post("/initialData");
    if (res.status === 200) {
      const { orders } = res.data;
      // dispatch({
      //   type: userContants.GET_ALL_USER_SUCCESS,
      //   payload: { users },
      // });
      // dispatch({
      //   type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
      //   payload: { categories },
      // });
      // dispatch({
      //   type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
      //   payload: { products },
      // });
      dispatch({
        type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
        payload: { orders },
      });
    }
    // console.log(res);
  };
};
