let login = document.querySelector('#login')
let userName = document.querySelector('#userName')
let password = document.querySelector('#password')
let timeLineType = getQueryString('type')
login.addEventListener('click', function () {
  loginFun()
})
document.body.addEventListener('keypress', function (e) {
  if(e.keyCode == 13){
    loginFun()
  }
})
function loginFun() {
  if (userName.value && password.value) {
    axios.post('/login',{
      username: userName.value,
      password: password.value
    }).then((data) => {
      if (data.data.code === '0000') {
        localStorage.setItem('_token', data.data.data.token)
        if (timeLineType) {
          window.location.href = `/?type=${timeLineType}`
        } else {
          window.location.href = '/'
        }
      } else {
        alert('账号密码错误！')
      }
    })
  }
}