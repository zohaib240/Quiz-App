const email1= document.querySelector('#email1')
const password1= document.querySelector('#password1')
const form1 =document.querySelector('#form1')
var check = 0;


// const Name= localStorage.getItem('Name')
// const email= localStorage.getItem('email')
// const password= localStorage.getItem('password')


form1.addEventListener('submit',function (login) {
   login.preventDefault()
var userdata =JSON.parse(localStorage.getItem('user'))
for (let v of userdata) {
  if(v.email==email1.value){
      check =1
      break
  } 
  console.log(check)
  
}
if (check==1) {
  window.location='quiz.html'
}else{
  
alert('please register your email')
}
email1.value=''
password1.value=''

})




