import qs from "qs";
import axios from "axios";

/**
 * 科举试题查询
 * @param match
 */
export const scholarTest = (match: string) => {
  let url = 'https://www.jx3api.com/data/exam/answer';
  url += `?${qs.stringify({match, limit: 10})}`
  return axios.get(url);
}
