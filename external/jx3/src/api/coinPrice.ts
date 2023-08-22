import qs from "qs";
import {CONSTS} from "../consts";
import axios from "axios";

/**
 * 金价查询
 * @param server 区服
 */
export const coinPrice = (server: string) => {
  let url = 'https://www.jx3api.com/view/trade/demon';
  url += `?${qs.stringify({server, robot: CONSTS.BOT_NAME, cache: 1})}`
  return axios.get(url);
}
