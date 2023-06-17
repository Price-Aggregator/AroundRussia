import React from "react";
import { useDispatch } from "react-redux";
import Search from "../components/Search/Search";
import Calendar from "../components/calendar/Calendar";
import Tickets from "../components/Tickets/Tickets";
import { ticketsInfo } from "../utils/constants";  //  заглушка
import { setTickets } from "../store/Tickets/slice";
// import { getCalendar } from "../store/Calendar/slice";

function ResultPage() {
  const dispatch = useDispatch()

  dispatch(setTickets(ticketsInfo))

  return (
    <main>
      <Search />
      <Calendar departureCity=" Москва" arrivalCity=" Калининград" />
      <Tickets />
    </main>)
}

export default ResultPage
