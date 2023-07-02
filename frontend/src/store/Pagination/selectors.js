import { paginationName } from "./slice";

export const getPage = (store) => store[paginationName].page

export const getPages = (store) => store[paginationName].pages
