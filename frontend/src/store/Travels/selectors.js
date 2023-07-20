import { travelsName } from './slice';

const getTravels = (store) => store[travelsName].travels;

export default getTravels;
