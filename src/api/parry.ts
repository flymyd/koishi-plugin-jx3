import axios from "axios";
import qs from "qs";

/**
 * 招架查询
 */
export const parry = (boss: string) => {
  let url = 'http://112.124.56.84:9091/api/canbeparry'
  url += `?${qs.stringify({boss})}`
  return axios.get(url);
}

/**
 * 副本招架查询
 */
export const dungeonParry = (dungeon: string) => {
  let url = 'http://112.124.56.84:9091/api/dungeon'
  url += `?${qs.stringify({dungeon})}`
  return axios.get(url);
}

