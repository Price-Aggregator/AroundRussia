import { searchFormName } from "./slice";

const getSearchFormState = (store) => store[searchFormName]

export default getSearchFormState
