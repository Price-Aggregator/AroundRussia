import React from "react";
import {  useSelector } from "react-redux";
import Search from "../components/Search/Search";
import Calendar from "../components/calendar/Calendar";
import Tickets from "../components/Tickets/Tickets";
// import { tickets } from "../utils/constants";  //  заглушка
// import { setTickets } from "../store/Tickets/slice";
import { getAllCities } from "../store/Cities/selectors";
import getSearchFormState from "../store/SearchForm/selectors";
// import { getCalendar } from "../store/Calendar/slice";

function ResultPage() {
  // const dispatch = useDispatch()
  const cities = useSelector(getAllCities)
  const form = useSelector(getSearchFormState)
  console.log(cities)

  // dispatch(setTickets(tickets))

  return (
    <main>
      <Search />
      <Calendar departureCity=" Москва" arrivalCity=" Калининград" when={form.when} />
      <Tickets />
    </main>)
}

export default ResultPage
