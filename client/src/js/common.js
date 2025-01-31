axios.defaults.baseURL = 'http://localhost:5000';
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const conFigUrl= config.url;
    if(conFigUrl.includes('auth/admin')){
      config.headers['Authorization'] = `Bearer ${localStorage.getItem("access_token")}`;

    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });