import qs from "qs";
import {CONSTS} from "../consts";
import axios from "axios";

/**
 * 新闻资讯
 */
export const maintenanceNews = (isPic: boolean) => {
  if (isPic) {
    let url = 'https://www.jx3api.com/view/web/news/announce';
    url += `?${qs.stringify({robot: CONSTS.BOT_NAME, cache: 1})}`
    return axios.get(url);
  } else return axios.get('https://www.jx3api.com/data/web/news/announce?limit=1');
}
