import { loaderName } from './slice';

const getLoaderState = (store) => store[loaderName];

export default getLoaderState;
