import axios from "axios";
import config from "../Config/config";
import { store } from "../Store/Index";
import { signOut } from "../Store/Slices/AuthSlice";

const { baseUrl } = config;
const getHeaders = () => {
  const state = store.getState();
  let user = state?.auth?.data;
  if (!user) return {};
  return { Authorization: `Bearer ${user.token}` };
};
const handleError = (error) => {
  let response = "";
  if (error?.response?.status === 401) {
    store.dispatch(signOut());
    //localStorage.removeItem("user");
    // const location = window.location.href;
    // if (!(location.includes('/login') || location.includes('/signup'))) {
    //   window.location.href = '/login';
    // }
    window.location.href = "/";
  }
  if (error.response) {
    response = error.response.data.message;
  } else if (error.request) {
    response = error.request.toString();
  } else {
    response = error.message;
  }
  console.log("response::::", response);
  throw new Error(response);
};
const httpRequest = async (
  method,
  url,
  data = "",
  headers
  // headers = {
  //   "Access-Control-Allow-Origin": "*",
  //   "Content-type": "application/json",
  // }
) => {
  let config = { method, url, headers: { ...getHeaders(), ...headers } };
  if (data) {
    config = { ...config, data };
  }
  try {
    const results = await axios(config);
    return results.data;
  } catch (error) {
    handleError(error);
  }
};
export const getRequest = (url) => httpRequest("get", baseUrl + "/" + url);
export const deleteRequest = (url) =>
  httpRequest("delete", baseUrl + "/" + url);
export const postRequest = (url, data, options = {}) =>
  httpRequest("post", baseUrl + "/" + url, data, options);
export const patchRequest = (url, data) =>
  httpRequest("patch", baseUrl + "/" + url, data);
