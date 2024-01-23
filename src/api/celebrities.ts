import axios from "axios";

/**
 * 新闻资讯
 */
export const celebrities = () => {
  return axios.get('https://www.jx3api.com/data/active/celebrities');
}
