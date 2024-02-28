// actions.js
import { fetchDataItem , fetchDataCategory, fetchDataOrderList} from './api';
  

export const FETCH_ITEM_REQUEST = 'FETCH_ITEM_REQUEST';
export const FETCH_ITEM_SUCCESS = 'FETCH_ITEM_SUCCESS';
export const FETCH_ITEM_FAILURE = 'FETCH_ITEM_FAILURE';
export const fetchItem = () => async dispatch => {
    dispatch({ type: FETCH_ITEM_REQUEST });
    try {
      const data = await fetchDataItem();
      dispatch({ type: FETCH_ITEM_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_ITEM_FAILURE, payload: error.message });
    }
  };
  
  export const FETCH_CATEGORY_REQUEST = 'FETCH_CATEGORY_REQUEST';
  export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
  export const FETCH_CATEGORY_FAILURE = 'FETCH_CATEGORY_FAILURE';
  
  export const fetchCategory = () => async dispatch => {
    dispatch({ type: FETCH_CATEGORY_REQUEST });
    try {
      const data = await fetchDataCategory();
      dispatch({ type: FETCH_CATEGORY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_CATEGORY_FAILURE, payload: error.message });
    }
  };
  




  export const FETCH_ORDERLIST_REQUEST = 'FETCH_ORDERLIST_REQUEST';
  export const FETCH_ORDERLIST_SUCCESS = 'FETCH_ORDERLIST_SUCCESS';
  export const FETCH_ORDERLIST_FAILURE = 'FETCH_ORDERLIST_FAILURE';
  
  export const fetchOrderList = () => async dispatch => {
    dispatch({ type: FETCH_ORDERLIST_REQUEST });
    try {
      const data = await fetchDataOrderList();
      dispatch({ type: FETCH_ORDERLIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_ORDERLIST_FAILURE, payload: error.message });
    }
  };
  