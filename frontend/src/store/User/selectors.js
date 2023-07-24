import { userName } from "./slice";

const getUserAuth = (store) => store[userName].isAuthenticated

const getUserToken = (store) => store[userName].token

export { getUserAuth, getUserToken }



