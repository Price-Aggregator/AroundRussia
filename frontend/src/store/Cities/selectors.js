import { citiesName } from "./slice";

const getCityByName = (store, name) => {
  const city = store[citiesName].find(item => item.name === name)
  return city
}

const getAllCities = (store) => store[citiesName]

export { getAllCities, getCityByName }
