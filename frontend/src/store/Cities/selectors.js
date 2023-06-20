import { citiesName } from "./slice";

const getCityByName = (store, name) => {
  const city = store[citiesName].cities.find(item => item.name === name)
  return city
}

const getAllCities = (store) => store[citiesName].cities

export { getAllCities, getCityByName }
