import { citiesName } from "./slice";

const getCityByLetter = (store) => store[citiesName].citiesByLetter

const getAllCities = (store) => store[citiesName].cities

export { getAllCities, getCityByLetter }
