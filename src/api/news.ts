import qs from "qs";
import {CONSTS} from "../consts";
import axios from "axios";

/**
 * 新闻资讯
 */
export const news = () => {
  return axios.get('https://www.jx3api.com/data/web/news/allnews?limit=5');
}
