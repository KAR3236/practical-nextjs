import Cookies from "js-cookie";

export function getToken(tokenName: string) {
  return Cookies.get(tokenName);
}
