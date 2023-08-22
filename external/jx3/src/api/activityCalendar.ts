import qs from "qs";
import {CONSTS} from "../consts";
import axios from "axios";

/**
 * 活动日历
 * @param num 未来X天的日历
 */
export const activityCalendar = (num: number = 15) => {
  let url = 'https://www.jx3api.com/view/active/calendar';
  url += `?${qs.stringify({num, robot: CONSTS.BOT_NAME, cache: 1})}`
  return axios.get(url);
}
