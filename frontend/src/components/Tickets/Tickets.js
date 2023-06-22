import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './Tickets.module.css'
import { TICKETS_ON_PAGE } from "../../utils/constants";
import { getPage } from "../../store/Pagination/selectors";
import Ticket from "../Ticket/Ticket";
import Pagination from "../Pagination/Pagination";
import { setPages } from "../../store/Pagination/slice";
import Filters from '../Filters/Filters';
import getTickets from "../../store/Tickets/selectors";

function Tickets() {
  const dispatch = useDispatch()
  const page = useSelector(getPage)
  const tickets = useSelector(getTickets)

  const [sliceNums, setSliceNums] = useState({ first: 0, second: 4 })
  const [bestPrice, setBestPrice] = useState()

  useEffect(() => {
    if(tickets) {
    const pages = Math.ceil(tickets.length / TICKETS_ON_PAGE)
    dispatch(setPages(pages))
    }
  }, [tickets, TICKETS_ON_PAGE])

  useEffect(() => {
    const first = 0 + (page - 1) * TICKETS_ON_PAGE
    const second = page * TICKETS_ON_PAGE
    setSliceNums({ first, second })
  }, [page])

  useEffect(() => {
    const best = tickets?.slice().sort((a, b) => +a.price - +b.price)[0]
    setBestPrice(best)
  }, [tickets])

  return (
    <section className={styles.tickets}>
      <Filters />
      <div className={styles.tickets__inner}>
        {bestPrice && (
          <Ticket
            price={bestPrice.price}
            company={bestPrice.airline}
            image={bestPrice.image}
            segments={bestPrice.segments}
            bestPrice
            id={bestPrice.link}
          />
        )}
        {tickets && tickets.slice(sliceNums.first, sliceNums.second).map((item) => (
          <Ticket
            key={item.link}
            id={item.link}
            oneTransfer={item.transfers === 1}
          />
        ))}
        <Pagination />
      </div>
    </section>
  )
}

export default Tickets
