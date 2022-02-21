class FirstPlugin {
  apply(compiler) {
    compiler.hooks.run.tap('LoggerPlugin', function (compiler) {
      console.log('plugin is running!')
    })
  }
}

module.exports =  {
  FirstPlugin
}
