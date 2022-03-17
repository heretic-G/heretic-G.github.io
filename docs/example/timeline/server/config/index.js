module.exports = {
  dev: {
    port: 9000,
    mongoDB: 'localhost:27017/timeline'
  },
  prod: {
    port: 9002,
    mongoDB: 'localhost:27017/timelineDev'
  }
}