export default function authHeader() {
  let user =
    JSON.parse(localStorage.getItem("user")) ||
    JSON.parse(sessionStorage.getItem("user"));

  if (user && user.token) {
    return user.token;
  } else {
    return "";
  }
}
