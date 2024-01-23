import {Context, h, Schema} from 'koishi'
import {dailyTask} from "./api/dailyTask";
import {DailyTaskPayloadType} from "./types/dailyTask";
import {activityCalendar} from "./api/activityCalendar";
import {scholarTest} from "./api/scholarTest";
import {cropPrice} from "./api/cropPrice";
import {matrixEffect} from "./api/matrixEffect";
import {serverStatus} from "./api/serverStatus";
import {news} from "./api/news";
import {maintenanceNews} from "./api/maintenanceNews";
import {coinPrice} from "./api/coinPrice";
import {joke} from "./api/joke";
import {celebrities} from "./api/celebrities";
import {dungeonParry, parry} from "./api/parry";

export const name = 'koishi-jx3'

export interface Config {
  defaultServer: string
}

export const Config: Schema<Config> = Schema.object({
  defaultServer: Schema.string().description("默认区服").default("绝代天骄")
})

export function apply(ctx: Context, config: Config) {
  ctx.command('剑三', '剑网3常用查询').action((_) => {
    return '使用如下指令以查询插件可用功能: help 剑三'
  })
  // 日常任务
  ctx.command('剑三/日常 [..rest]', `查询指定区服的日常任务，如: 日常 ${config.defaultServer || '绝代天骄'}`).action(async (_, ...rest) => {
    const params = {}
    if (rest.length > 0) {
      params['server'] = rest[0]
    } else if (rest.length > 1) {
      params['num'] = rest[1]
    } else {
      params['server'] = config.defaultServer;
    }
    // 文字版
    // const res = await dailyTask(<DailyTaskPayloadType>params).catch(e => e)
    // const resp: DailyTaskTextRespType = res?.data?.data ?? {};
    // return JSON.stringify(resp);
    // 图片版
    const res = await dailyTask(<DailyTaskPayloadType>params, true).catch(e => e)
    const resp: any = res?.data?.data ?? {};
    if (Object.keys(resp).length > 0) {
      return h('image', {url: resp.url});
    } else return '请求错误，请输入正确的区服名'
  })

  // 活动日历-图片
  ctx.command('剑三/日历 <num>', '查询未来N天的活动日历，默认15天，最小7天。如: 日历、日历 30').alias('活动日历')
    .action(async (_, num) => {
      let res;
      if (num) {
        if (Number(num) < 7) {
          return '至少查询未来7天的活动日历。'
        }
        res = await activityCalendar(Number(num)).catch(e => e)
      } else res = await activityCalendar().catch(e => e)
      const resp: any = res?.data?.data ?? {};
      if (Object.keys(resp).length > 0) {
        return h('image', {url: resp.url});
      } else return '请求错误。'
    })

  // 科举查询
  ctx.command('剑三/科举 <match>', '科举试题答案搜索，支持首字母，支持模糊查询。如: 科举 古琴').alias('科举查询').alias('科举试题')
    .action(async (_, match) => {
      if (match) {
        const res = await scholarTest(match).catch(e => e)
        if (res.data.code === 400) {
          return res.data.msg
        } else {
          const resp = res?.data?.data ?? []
          return resp.map((obj, i) => `${i + 1}: ${obj.question} 答案: ${obj.answer}`).join('\n');
        }
      } else return '请输入科举试题，支持首字母，支持模糊查询。'
    })

  // 作物查询-图片
  ctx.command('剑三/花价 <server>', `查询指定区服的花价，如: 花价 ${config.defaultServer || '绝代天骄'}`).alias('作物').alias('作物价格')
    .action(async (_, server) => {
      if (!server) {
        server = config.defaultServer;
      }
      const res = await cropPrice(server).catch(e => e)
      const resp: any = res?.data?.data ?? {};
      if (Object.keys(resp).length > 0) {
        return h('image', {url: resp.url});
      } else return '请求错误，请输入正确的区服名'
    })

  // 阵法效果查询
  ctx.command('剑三/阵眼 <name>', `查询指定心法的阵眼，如: 阵眼 凌海诀`).alias('阵法')
    .action(async (_, name) => {
      if (name) {
        const res = await matrixEffect(name).catch(e => e)
        if (res.data.code === 400) {
          return res.data.msg
        } else {
          const resp = res?.data?.data ?? {}
          let text = resp.skillName + '\n'
          return text + resp.descs.map(obj => `${obj.name}: \n${obj.desc}`).join('\n');
        }
      } else return '请输入正确的心法名称。'
    })

  // 区服状态查询
  ctx.command('剑三/开服 <server>', `查询指定区服的开服状态，如: 开服 ${config.defaultServer || '绝代天骄'}`).alias('区服')
    .action(async (_, server) => {
      if (!server) {
        server = config.defaultServer;
      }
      const res = await serverStatus(server).catch(e => e)
      if (res.data.code === 400) {
        return res.data.msg
      } else {
        const resp = res?.data?.data ?? {}
        if (resp.server) {
          return `${resp.zone} ${resp.server}\n状态: ${resp.status ? '已开服' : '维护中'}`;
        } else return '请输入正确的区服名称。'
      }
    })

  // 新闻资讯
  ctx.command('剑三/新闻', '查看剑三官网的近5条新闻').alias('剑三新闻').action(async (_) => {
    const res = await news().catch(e => e)
    if (res.data.code === 400) {
      return res.data.msg
    } else {
      const resp = res?.data?.data ?? []
      return resp.map(obj => `${obj.date} ${obj.type}\n${obj.title}\n${obj.url}`).join('\n\n')
    }
  })

  // 维护公告
  ctx.command('剑三/公告', '查看维护公告').alias('维护公告').action(async (_) => {
    const res = await maintenanceNews(false).catch(e => e)
    if (res.data.code === 400) {
      return res.data.msg
    } else {
      const resp = res?.data?.data ?? []
      const text = resp.map(obj => `${obj.date} ${obj.type}\n${obj.title}\n${obj.url}`).join('\n\n')
      const pic = await maintenanceNews(true).catch(e => e)
      const picResp: any = pic?.data?.data ?? {};
      if (Object.keys(picResp).length > 0) {
        return text + h('image', {url: picResp.url});
      } else return text;
    }
  })

  // 金价查询-图片
  ctx.command('剑三/金价 <server>', `查询指定区服的金价，如: 金价 ${config.defaultServer || '绝代天骄'}`).alias('比例').alias('金价比例')
    .action(async (_, server) => {
      if (!server) {
        server = config.defaultServer;
      }
      const res = await coinPrice(server).catch(e => e)
      const resp: any = res?.data?.data ?? {};
      if (Object.keys(resp).length > 0) {
        return h('image', {url: resp.url});
      } else return '请求错误，请输入正确的区服名'
    })

  // 骚话
  ctx.command('剑三/骚话', '来点骚话').alias('万花骚话').action(async (_) => {
    const res = await joke().catch(e => e)
    if (res.data.code === 400) {
      return res.data.msg
    } else {
      const resp = res?.data?.data ?? {}
      return resp.text;
    }
  })

  // 楚天社
  ctx.command('剑三/楚天行侠', '查询楚天社进度').alias('楚天社').alias('行侠').alias('楚天')
    .action(async (_) => {
      const res = await celebrities().catch(e => e)
      if (res.data.code === 400) {
        return res.data.msg
      } else {
        const resp = res?.data?.data ?? []
        return resp.map(obj => `${obj.time} ${obj.map_name}-${obj.site} ${obj.event} ${obj.desc}`).join("\n")
      }
    })

  // 招架查询
  ctx.command('招架 <boss>', `查询指定BOSS的招架数据，如: 招架 时风`).alias('招架查询')
    .action(async (_, boss) => {
      if (boss) {
        const res = await parry(boss).catch(e => e)
        if (res.data.code === 400) {
          return res.data.msg
        } else {
          const resp = res?.data?.data ?? []
          if (resp.length) {
            return resp.map((obj, i) => `${i + 1}. ${obj.Desc}\n`)
          } else return '暂无查询结果'
        }
      } else return '请输入正确的BOSS名称。'
    })

  // 副本招架查询
  ctx.command('副本招架 <dungeon>', `查询指定副本的招架数据，如: 招架 时风`).alias('副本')
    .action(async (_, dungeon) => {
      if (dungeon) {
        const res = await dungeonParry(dungeon).catch(e => e)
        if (res.data.code === 400) {
          return res.data.msg
        } else {
          const resp = res?.data?.data ?? []
          if (resp.length) {
            return resp.map((obj, i) => `${i + 1}. ${obj.Desc}\n`)
          } else return '暂无查询结果'
        }
      } else return '请输入正确的副本名称。'
    })

}

