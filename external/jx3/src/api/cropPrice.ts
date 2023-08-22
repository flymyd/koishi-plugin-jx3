import qs from "qs";
import {CONSTS} from "../consts";
import axios from "axios";

/**
 * 作物价格查询
 * @param server 区服
 */
export const cropPrice = (server: string) => {
  let url = 'https://www.jx3api.com/view/home/flower';
  url += `?${qs.stringify({server, robot: CONSTS.BOT_NAME, cache: 1})}`
  return axios.get(url);
}
