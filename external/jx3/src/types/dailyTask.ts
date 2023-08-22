/**
 * server? 区服名称 预测目标区服的美人图
 * num 预测时间，预测指定时间的日常，默认值 : 0 为当天，1 为明天，以此类推。
 * 只有 星期三、星期五、星期六、星期日 才有美人图，星期三、星期五 才有世界首领，若非活动时间不返回相关键与值。
 */
export interface DailyTaskPayloadType {
  server?: string,
  num: number
}

/**
 * date 日期
 * week 周N
 * war 大战
 * battle 战场
 * orecar 矿车
 * leader 世界boss
 * school 门派任务
 * rescue 驰援
 * draw 美人图
 * luck 福缘宠物 数组
 * card 声望加倍 数组
 * team 周常 数组 公共周常 五人周常 十人周常
 * time 时间戳
 */
export interface DailyTaskTextRespType {
  date: string,
  week: string,
  war: string,
  battle: string,
  orecar: string,
  leader: string,
  school: string,
  rescue: string,
  draw: string,
  luck: Array<string>,
  card: Array<string>,
  team: Array<string>,
}
