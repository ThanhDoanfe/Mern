async function HandleRegister(){
  try{
    const container = document.querySelector(".container");
    const username = document.getElementById('username-SU').value;
    const password = document.getElementById('pass-SU').value;
    const email = document.getElementById('email-SU').value;
    const dateOfBirth = document.getElementById('date-SU').value; 
   const response = await axios.post('/api/auth/register', {
       username: username,
       email: email,
       password: password,
       dateOfBirth: dateOfBirth,
     });
     if(response.status==200){
      alert("Đăng ký thành công!");
      container.classList.remove("sign-up-mode");
      //
      document.getElementById('username-SU').value = '';
      document.getElementById('pass-SU').value = '';
      document.getElementById('email-SU').value = '';
      document.getElementById('date-SU').value = '';
        
     }
  }
  catch(error){
    console.error("Error during registration:", error);
  }

}



