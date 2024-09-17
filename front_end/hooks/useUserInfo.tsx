import { useState, useEffect } from 'react';

function useUserInfo() {

  const [data,setData] = useState({})
 
  useEffect(() => {
    let userData:any = {}
    userData.token = localStorage.getItem("TOKEN");
    userData.user = localStorage.getItem("USER_INFO") && JSON.parse(localStorage.getItem("USER_INFO") ?? "");
    setData(userData)
  }, []);

  return data;
}

export default useUserInfo;