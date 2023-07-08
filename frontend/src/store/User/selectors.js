import { userName } from "./slice";

const getUserAuth = (store) => store[userName].isAuthenticated

export default getUserAuth



