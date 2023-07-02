import { filtersName } from "./slice";

const getFiltersState = (store) => store[filtersName]

export default getFiltersState
