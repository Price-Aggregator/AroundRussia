import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './Tickets.module.css'
import { ticketsInfo, numberOfTicketsOnPage } from "../../utils/constants"; // Заглушка до появления данных с бэка, удалить
import { getPage } from "../../store/Pagination/selectors";
import Ticket from "../Ticket/Ticket";
import Pagination from "../Pagination/Pagination";
import { setPages } from "../../store/Pagination/slice";

function Tickets() {
  const dispatch = useDispatch()
  const page = useSelector(getPage)
  const [sliceNums, setSliceNums] = useState({ first: 0, second: 4 })
  const [bestPrice, setBestPrice] = useState()

  useEffect(() => {
    const pages = Math.ceil(ticketsInfo.length / numberOfTicketsOnPage)
    dispatch(setPages(pages))
  }, [ticketsInfo, numberOfTicketsOnPage])

  useEffect(() => {
    const first = 0 + (page - 1) * numberOfTicketsOnPage
    const second = page * numberOfTicketsOnPage
    setSliceNums({ first, second })
  }, [page])

  useEffect(() => {
    const best = ticketsInfo.slice().sort((a, b) => +a.price - +b.price)[0]
    setBestPrice(best)
  }, [])

  return (
    <section className={styles.tickets}>
      {bestPrice && <Ticket price={bestPrice.price} company={bestPrice.company} image={bestPrice.image} segments={bestPrice.segments} bestPrice id={bestPrice.id} />}
      {ticketsInfo.slice(sliceNums.first, sliceNums.second).map((item) =>
        <Ticket key={item.id} id={item.id} oneTransfer={item.transfer === 1} />)}
      <Pagination />
    </section>
  )
}

export default Tickets
