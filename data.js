window.dataJson = {
  'paas-authinfo': {
    label: 'paas authinfo的配置',
    url: '/channel/authinfo',
    data: {
      'uid': '',
      'nickname': '',
      'channelId': '',
      'body': '',
    }
  },
  'saas-authinfo-v3': {
    label: 'saas v3 authinfo的配置',
    url: '/api/v3/room/authinfo',
    data: {
      'uid': '',
      'nickname': '',
      'roomId': '',
      'body': '',
    }
  },
  'saas-authinfo-v4': {
    label: 'saas v4 authinfo的配置',
    url: '/api/v4/room/authinfo',
    data: {
      'uid': '',
      'nickname': '',
      'roomId': '',
      'body': '',
    }
  },
  'admin-authinfo': {
    label: 'admin的 authinfo的配置',
    url: '/api/admin/room/authinfo',
    data: {
      'zhibo': '',
      'roomId': '',
      'body': '',
    }
  },
  'saas-package-status': {
    label: 'saas的离线打包状态',
    url: '/api/v3/room/package/status',
    data: {
      'roomId': '',
      'body': '',
    }
  },
  'saas-package-push': {
    label: 'saas的离线打包执行接口',
    url: '/api/v3/room/package/push',
    data: {
      'roomId': '',
      'body': '',
    }
  },
  'saas-v3-创建课程': {
    label: 'saas-v3-创建课程',
    url: '/api/v3/room/create',
    data: {
      'title': '',
      'roomType': '',
      'startTime': '',
      'duration': '',
      'clientType': 0,
      'body': '',
    }
  },
  'saas-v4-创建课程': {
    label: 'saas-v4-创建课程',
    url: '/api/v4/room/create',
    data: {
      'title': '',
      'roomType': '',
      'startTime': '',
      'duration': '',
      'video': 1,
      'clientType': 0,
      'body': '',
    }
  },
  'saas-直播教室统计': {
    label: 'saas-直播教室统计',
    url: '/api/v3/statistics/zhibo/room',
    data: {
      'roomId': '',
      'body': '',
    }
  },
  'saas-直播用户统计': {
    label: 'saas-直播用户统计',
    url: '/api/v3/statistics/zhibo/user',
    data: {
      'roomId': '',
      'uid': '',
      'body': '',
    }
  },
  'saas-回放教室统计': {
    label: 'saas-回放教室统计',
    url: '/api/v3/statistics/statistics/room',
    data: {
      'roomId': '',
      'body': '',
    }
  },
  'saas-回放用户统计': {
    label: 'saas-回放用户统计',
    url: '/api/v3/statistics/playback/user',
    data: {
      'roomId': '',
      'uid': '',
      'body': '',
    }
  },
}