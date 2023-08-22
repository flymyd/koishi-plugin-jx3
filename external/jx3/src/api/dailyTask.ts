import {DailyTaskPayloadType} from "../types/dailyTask";
import axios from 'axios';
import qs from 'qs';
import {CONSTS} from "../consts";

/**
 * 查询日常任务
 * @param isPic? 返回图片
 * @param payload? 附加参数
 */
export const dailyTask = (payload: DailyTaskPayloadType, isPic?: boolean) => {
  return isPic ? pic({...payload}) : text({...payload});
}

/**
 * 文字版
 */
const text = ({server, num = 0}: DailyTaskPayloadType) => {
  let url = 'https://www.jx3api.com/data/active/current';
  if (server || num) {
    url += `?${qs.stringify({server, num})}`
  }
  return axios.get(url);
}
const pic = ({server, num = 0}: DailyTaskPayloadType) => {
  let url = 'https://www.jx3api.com/view/active/current';
  if (server || num) {
    url += `?${qs.stringify({server, num, robot: CONSTS.BOT_NAME, cache: 1})}`
  }
  return axios.get(url);
}
