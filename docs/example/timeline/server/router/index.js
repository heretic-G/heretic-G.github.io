const router = require('koa-router')()
const fs = require('fs')
let monk = require('monk')
const config = require('../config/index')

let  db = monk(config[process.argv[2]].mongoDB)
const uuid = require('node-uuid')
let user = db.get('user')
let tokenDB = db.get('token')
let eventDB = db.get('event')
let timelineDB = db.get('timeline')
let shareDB = db.get('share')
let relateEventAndTimeLineDB = db.get('relateEventAndTimeLine')

const _overTime = 1000 * 60 * 60 * 24 * 2

router.get('/login', async (ctx, next) => {
  ctx.response.type = 'html'
  ctx.response.body = fs.createReadStream('/login.html')
});

router.get('/register', async (ctx, next) => {
  ctx.response.type = 'html'
  ctx.response.body = fs.createReadStream('/register.html')
});

router.post('/login', async (ctx, next) => {
  ctx.response.set("Content-Type", "application/json")
  let result =  await user.find({"name": ctx.request.body.username}).then((doc) => {
    if (doc.length === 1 && doc[0].password === ctx.request.body.password) {
      let token = uuid.v4()
      tokenDB.update({username: ctx.request.body.username},
        {
          token: token, username: ctx.request.body.username,
          overTime: Date.now() + _overTime
        },
        {
          upsert: true
        })
      return {
        code: '0000',
        message: '成功',
        data: {
          token: token
        }
      };
    } else {
      return {
        code: '1000',
        message: '用户名或者密码错误'
      };
    }
  },(err) => {
    return {
      code: '0005',
      message: 'server error'
    };
  })
  ctx.response.body = JSON.stringify(result)
});

router.post('/register', async (ctx, next) => {
  let result = await user.find({"name": ctx.request.body.username}).then(async (doc) => {
    if (doc.length === 0) {
      let insertResult = await user.insert({name: ctx.request.body.username, password: ctx.request.body.password, roles: 'ordinary'});
      return {
        code: '0000',
        message: '注册成功'
      };
    } else {
      return {
        code: '1001',
        message: '已经存在此账户'
      };
    }
  })
  ctx.response.body = JSON.stringify(result)
});


router.post('/logout', async (ctx, next) => {
  let result = await checkToken(ctx.request.body.token, _overTime)
  if (result.code === '0000') {
    await tokenDB.remove({token: ctx.request.body.token})
  }
  ctx.response.body = JSON.stringify(result)
});

router.post('/addEvent', async (ctx, next) => {
  let result = await checkToken(ctx.request.body.token, _overTime)
  if (result.code === '0000') {
    let logo = ctx.request.body.logo
    let title = ctx.request.body.title
    let time = ctx.request.body.time
    let liablePerson = ctx.request.body.liablePerson
    let description = ctx.request.body.description
    let timeline = ctx.request.body.timeline
    timeline = timeline.filter(curr => curr !== '我创建的时间线')
    let creator = result.username
    if (logo && title && time && timeline && liablePerson && timeline.length > 0) {
      let data = await eventDB.insert({logo, title, time, liablePerson, description, createTime: Date.now(), creator})
      await timeline.forEach((curr) => {
        (async function  () {
          await timelineDB.update({name: curr},{name: curr}, {upsert: true})
          await relateEventAndTimeLineDB.insert({event: monk.id(data._id), timeline: curr})
        })()
      })
      result = {
        code: '0000'
      }
    } else {
      result = {
        code : '3000',
        message: '参数缺失'
      }
    }
  }
  ctx.response.body = JSON.stringify(result)
})

router.post('/editEvent', async (ctx, next) => {
  let result = await checkToken(ctx.request.body.token, _overTime)
  if (result.code === '0000') {
    let logo = ctx.request.body.logo
    let title = ctx.request.body.title
    let time = ctx.request.body.time
    let liablePerson = ctx.request.body.liablePerson
    let description = ctx.request.body.description
    let timeline = ctx.request.body.timeline
    timeline = timeline.filter(curr => curr !== '我创建的时间线')
    let _id = ctx.request.body._id
    if (logo && title && liablePerson && time && timeline.length > 0) {
      let eventData = await eventDB.find({_id: monk.id(_id)})
      if (result.roles === 'administrator' || result.username === eventData[0].creator) {
        let data = await eventDB.update({_id: monk.id(_id)},{$set: {logo, title, time, description, liablePerson}},{upsert: true})
        await relateEventAndTimeLineDB.remove({event: monk.id(_id)})
        await timeline.forEach((curr) => {
          (async function  () {
            await timelineDB.update({name: curr},{name: curr}, {upsert: true})
            await relateEventAndTimeLineDB.insert({event: monk.id(_id), timeline: curr})
          })()
        })
        result = {
          code: '0000'
        }
      } else {
        result = {
          code : '5000',
          message: '权限不足'
        }
      }

    } else {
      result = {
        code : '3000',
        message: '参数缺失'
      }
    }
    ctx.response.body = JSON.stringify(result)
  }
})

router.post('/deleteEvent', async (ctx, next) => {
  let result = await checkToken(ctx.request.body.token, _overTime)
  if (result.code === '0000') {
    let eventData = await eventDB.find({_id: monk.id(ctx.request.body._id)})
    if (result.roles === 'administrator' || result.username === eventData[0].creator) {
      await eventDB.remove({_id: monk.id(ctx.request.body._id)})
      await relateEventAndTimeLineDB.remove({event: monk.id(ctx.request.body._id)})
      ctx.response.body = {
        code: '0000'
      }
    } else {
      ctx.response.body = {
        code : '5000',
        message: '权限不足'
      }
    }
  }
})

router.post('/share', async (ctx,next) => {
  let result = await checkToken(ctx.request.body.token, _overTime)
  if (result.code === '0000') {
    let uuidKey = uuid.v4()
    let timeline = ctx.request.body.timeline
    timeline = timeline.filter(curr => curr !== '我创建的时间线')
    if (timeline.length > 0) {
      for (let i = 0;i < timeline.length; i++) {
        await shareDB.insert({share: uuidKey, timeline: timeline[i]})
      }
      result.data = {
        share: uuidKey
      }
    } else {
      result = {
        code: '3000',
        message: '参数缺失'
      }
    }
  }
  ctx.response.body = JSON.stringify(result)
})
router.post('/getShareLine', async (ctx,next) => {
  let result = {}
  if (ctx.request.body.share) {
    let timeArr = await shareDB.find({share: ctx.request.body.share})
    console.log(timeArr)
    if (!ctx.request.body.token) {
      result = {
        code: '0000',
        data: []
      }
      for(let i = 0; i < timeArr.length; i++) {
        let timeline = {
          name: timeArr[i].timeline,
          data: []
        }
        let eventArr = await relateEventAndTimeLineDB.find({timeline: timeArr[i].timeline})
        for (let j = 0; j <eventArr.length; j++ ) {
          let eventData = await eventDB.find({_id: monk.id(eventArr[j].event)})
          timeline.data.push(eventData[0])
        }
        if (timeline.data.length > 0) {
          result.data.push(timeline)
        }
      }
    } else {
      let shareTimeLine = timeArr.map(curr => curr.timeline)
      result = await checkToken(ctx.request.body.token, _overTime)
      result.active = shareTimeLine
      if (result.code = '0000') {
        result.data = []
        let timeArr = await timelineDB.find()
        for(let i = 0; i < timeArr.length; i++) {
          let timeline = {
            name: timeArr[i].name,
            data: []
          }
          let eventArr = await relateEventAndTimeLineDB.find({timeline: timeArr[i].name})
          for (let j = 0; j <eventArr.length; j++ ) {
            let eventData = await eventDB.find({_id: monk.id(eventArr[j].event)})
            if (result.roles === 'administrator' || result.username === eventData[0].creator) {
              eventData[0].permission = {
                edit: true
              }
            } else {
              eventData[0].permission = {
                edit: false
              }
            }
            timeline.data.push(eventData[0])
          }
          if (timeline.data.length > 0) {
            result.data.push(timeline)
          }
        }
        // 添加我创建的事件 形成一条新的时间线
        let creatorTimeLine = await eventDB.find({creator: result.username})
        if (creatorTimeLine.length > 0) {
          for (let i = 0; i< creatorTimeLine.length; i++) {
            creatorTimeLine[i].permission = {
              edit: true
            }
          }
          result.data.push({
            name: '我创建的时间线',
            data: creatorTimeLine
          })
        }
      }
    }
  } else {
    result = {
      code: '3000',
      message: '参数缺失'
    }
  }
  ctx.response.body = JSON.stringify(result)
})
router.post('/getTimeLineList', async (ctx, next) => {
  let result = await checkToken(ctx.request.body.token, _overTime)
  if (result.code === '0000') {
    result.data = []
    let timeArr = await timelineDB.find()
    for(let i = 0; i < timeArr.length; i++) {
      let timeline = {
        name: timeArr[i].name,
        data: []
      }
      let eventArr = await relateEventAndTimeLineDB.find({timeline: timeArr[i].name})
      for (let j = 0; j <eventArr.length; j++ ) {
        let eventData = await eventDB.find({_id: monk.id(eventArr[j].event)})
        if (result.roles === 'administrator' || result.username === eventData[0].creator) {
          eventData[0].permission = {
            edit: true
          }
        } else {
          eventData[0].permission = {
            edit: false
          }
        }
        timeline.data.push(eventData[0])
      }
      if (timeline.data.length > 0) {
        result.data.push(timeline)
      }
    }
    // 添加我创建的事件 形成一条新的时间线
    let creatorTimeLine = await eventDB.find({creator: result.username})
    if (creatorTimeLine.length > 0) {
      for (let i = 0; i< creatorTimeLine.length; i++) {
        creatorTimeLine[i].permission = {
          edit: true
        }
      }
      result.data.push({
        name: '我创建的时间线',
        data: creatorTimeLine
      })
    }
  }
  ctx.response.body = JSON.stringify(result)
})

async function checkToken (token,overTime) {
  if (!token) {
    return {
      code: '3001',
      message: 'token缺失'
    }
  }
  let result = await tokenDB.find({token: token}).then(async (doc) => {
    if (doc.length === 1) {
      if (Date.now() < doc[0].overTime) {
        await tokenDB.update({token: token},{$set:{overTime: Date.now() + overTime}})
        let userInfo = await user.find({name: doc[0].username})
        return {
          code: '0000',
          username: doc[0].username,
          roles: userInfo[0].roles
        }
      } else {
        return {
          code: '2000',
          message: 'token 验证错误1'
        }
      }
    } else {
      return {
        code: '2000',
        message: 'token 验证错误2'
      }
    }

  },() => {
    return {
      code: '0005',
      message: 'server error'
    }
  })
  return result
}

router.post('/check', async (ctx, next) => {
  let result = await checkToken(ctx.request.body.token, _overTime)
  ctx.response.body = JSON.stringify(result)
})
router.get('/', async (ctx, next) => {
  ctx.response.type = 'html'
  ctx.response.body = fs.createReadStream('/index.html')
});

module.exports = router