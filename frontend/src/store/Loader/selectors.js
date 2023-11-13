import { loaderName } from "./slice";

const getLoaderState = (store) => store[loaderName].isLoading;

export default getLoaderState;
