// 매번 똑같은 URL로 요청을 보낸다면 이렇게 만들어서 재활용해도됨
import axios from "axios";


const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`, // 자동으로 앞에 url 저걸로 잡아주고 이제 뒤에 주소만 적어주면댐
  headers : {
    'Content-Type' : 'application/json; charset=utf-8'  // 이거 미리 넣어주면, 앞으로 요청날릴때 헤더에 따로 보내줄 필요 없음
  }
});
// ex) axiosInstance.get('/userInfo') -> 번거롭게 axios.post(`${process.env.REACT_APP_SERVER_URL}/userInfo) 이렇게 안적어도됨



function addJwtToRequest(config){ // request객체를 매개변수로 받아와서 헤더에 토큰을 추가해주는 함수

  const jwt = sessionStorage.getItem('jwt');  //세션에 jwt값을 가져와줌 (로그인한 사람만 jwt토큰값이 있음)

  if(jwt){  //토큰 값이 있을때만 헤더에 토큰값을 넣어줌
    config.headers['Authorization'] = `Bearer ${jwt}`;
  }

  return config;
}

// 요청 날리기 전에 이게 먼저 작동됨 
axiosInstance.interceptors.request.use(
  (config) => addJwtToRequest(config),  //request(config)객체에 있는걸 add뭐시기 메서드에 보내고 값이 있으면 리턴 받음
  (error) => Promise.reject(error)
);

export default axiosInstance;