import qs from "qs";
import axios from "axios";

/**
 * 阵法效果
 * @param name 心法名
 */
export const matrixEffect = (name: string) => {
  let url = 'https://www.jx3api.com/data/school/matrix'
  url += `?${qs.stringify({name})}`
  return axios.get(url);
}
