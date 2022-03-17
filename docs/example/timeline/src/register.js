let register = document.querySelector('#register')
let userName = document.querySelector('#userName')
let password = document.querySelector('#password')
let rePassword = document.querySelector('#rePassword')
register.addEventListener('click', function () {
  registerFun()
})
document.body.addEventListener('keypress', function (e) {
  if(e.keyCode == 13){
    registerFun()
  }
})
function registerFun() {
  if (password.value && password.value === rePassword.value) {
    if (userName.value && password.value) {
      axios.post('/register',{
        username: userName.value,
        password: password.value
      }).then((data) => {
        if (data.data.code === '0000') {
          window.location.href = '/login'
        } else {
          alert(data.data.message)
        }
      })
    }
  } else {
    alert("两次输入的密码不一致~")
  }

}