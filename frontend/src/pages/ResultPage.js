import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Search from "../components/Search/Search";
import Calendar from "../components/calendar/Calendar";
import Tickets from "../components/Tickets/Tickets";
// import { tickets } from "../utils/constants";  //  заглушка
// import { setTickets } from "../store/Tickets/slice";
import getSearchFormState from "../store/SearchForm/selectors";
import { fetchCalendar } from "../store/Calendar/slice";
// import { getCalendar } from "../store/Calendar/slice";

function ResultPage() {
  const dispatch = useDispatch()
  const form = useSelector(getSearchFormState)
  dispatch(fetchCalendar(form))


  return (
    <main>
      <Search />
      <Calendar departureCity={form.from} arrivalCity={form.to} when={form.when} />
      <Tickets />
    </main>)
}

export default ResultPage
