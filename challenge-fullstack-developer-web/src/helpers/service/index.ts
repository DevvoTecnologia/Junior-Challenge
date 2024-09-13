
const authHeader = () => {
  let userChallenge: any = localStorage.getItem('userChallenge');
  let userParse: any = JSON.parse(userChallenge);

  if (userParse && userParse?.accessToken) {
    return { 'Authorization': 'Bearer ' + userParse?.accessToken };
  } else {
    return {};
  };
};

const handlerTokenExpired = () => {
  localStorage.clear();
  window.location.reload();
};

export { handlerTokenExpired, authHeader };