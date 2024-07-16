
// Hàm gọi API để lấy danh sách người dùng
async function getListUser() {
  try {
   
    const response = await axios.get("/auth/admin/user");
    showListUser(response);
    //show name user main navbar
    const accessToken=localStorage.getItem('access_token');
    const PayloadDecoder=jwt_decode(accessToken)
    document.querySelector('.username-logo').innerHTML=PayloadDecoder.username
  } catch (error) {
    console.error('Lỗi khi lấy danh sách người dùng:', error.response ? error.response.data : error.message);
    if (error.response && error.response.status === 401){
      window.location.href='./index.html'
    }
    // if (error.response && error.response.status === 401) {
    //   // Nếu token hết hạn, gọi hàm refresh token
    //   const newAccessToken = await refreshAccessToken();
    //   if (newAccessToken) {
    //     // Gọi lại hàm getListUser() sau khi refresh token thành công
    //     await getListUser();
    //   } else {
    //     // Chuyển hướng đến trang đăng nhập nếu không thể refresh token
    //     window.location.href = '/admin/login';
    //   }
    // }
  }
}
// Hàm chuyển đổi định dạng ngày tháng
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = (`0${date.getDate()}`).slice(-2);
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}


// Hàm hiển thị danh sách người dùng
function showListUser(response) {
  let htmlUser = `<table class="table table-hover text-nowrap">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>DateOfBirth</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>`;
  
  response.data.forEach(function(user, index) {
    htmlUser += `<tr>
          <td>${index + 1}</td>
          <td>${user.username}</td>
          <td>${formatDate(user.dateOfBirth)}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td><button id=${user._id} class="btn btn-danger" onclick="deleteUser(this.id)">Delete</button></td>
        </tr>`;
  });

  htmlUser += `</tbody></table>`;
  document.querySelector('.list_user').innerHTML = htmlUser;
  
}



document.getElementById('createBtn').addEventListener('click', function() {
  document.getElementById('createFormContainer').style.display = 'block';
});

//show list user
async function handleSubmitAddUser() {
  try {
    const username = document.getElementById('add-username').value;
    const password = document.getElementById('add-password').value;
    const email = document.getElementById('add-email').value;
    const dateOfBirth = document.getElementById('add-date').value;
    const isAdmin = document.getElementById('role-admin').checked;
    const role = isAdmin ? 'admin' : 'regular';

    console.log('Role:', role);  // Kiểm tra giá trị của role

    const response = await axios.post('/auth/admin/user/create', {
      username: username,
      email: email,
      password: password,
      dateOfBirth: dateOfBirth,
      role: role,
    });

    if (response.status === 200) {
      alert('Đăng ký thành công!');
      document.getElementById('userForm').reset(); // Reset form input
      document.getElementById('createFormContainer').style.display = 'none'; // Ẩn form sau khi thêm người dùng
      getListUser(); // Refresh lại danh sách người dùng
    }
  } catch (error) {
    console.error('Error during add user:', error.response ? error.response.data : error.message);
  }}

  // Hàm xóa người dùng
async function deleteUser(userId) {
  try {
   
    const response = await axios.delete(`/auth/admin/user/delete/${userId}`);
    if (response.status === 200) {
      alert('Xóa người dùng thành công');
      getListUser();
    }
  } catch (error) {
    console.error('Lỗi khi xóa người dùng:', error.response ? error.response.data : error.message);
  }
}
function handleLogOutUser(){
  localStorage.removeItem('access_token');
  window.location.href='./index.html'
}

  getListUser();



