import axios from "axios";

/**
 * 新闻资讯
 */
export const joke = () => {
  return axios.get('https://www.jx3api.com/data/saohua/random');
}
