async function HandleLogin()
{
 
  try{
    const password = document.getElementById('SI-password').value;
    const email = document.getElementById('SI-Email').value;
    
    
    const response = await axios.post('/api/auth/login', {
      email: email,
      password: password,   
    });  console.log('Response:', response)

    if(response.status==200){
      console.log('login success full');
      const accessToken = response.data.accessToken;
      //decode de lay ra thong tin payload de check role 
      
      const payload = jwt_decode(accessToken);
      console.log('Payload:', payload);
      if (payload.role === 'regular') {
       
        window.location.href='home_page.html'
      } else {
        window.location.href='admin_page.html'

      }
      //save access token to client
      localStorage.setItem('access_token',accessToken)
     }}catch(error){
      console.error('Error during login:', error.response ? error.response.data : error.message);

     }
    }
   
      

// const Sign_in = sign_in_btn.addEventListener("click", () => {
//   container.classList.remove("sign-up-mode");
// });

