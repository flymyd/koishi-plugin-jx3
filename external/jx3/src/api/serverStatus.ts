import qs from "qs";
import {CONSTS} from "../consts";
import axios from "axios";

/**
 * 开服状态
 * @param server 区服
 */
export const serverStatus = (server: string) => {
  let url = 'https://www.jx3api.com/data/server/check';
  url += `?${qs.stringify({server})}`
  return axios.get(url);
}
