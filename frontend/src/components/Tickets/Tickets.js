import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from './Tickets.module.css'
import ticketsInfo from "../../utils/constants"; // Заглушка до появления данных с бэка, удалить
import Ticket from "../Ticket/Ticket";
import Pagination from "../Pagination/Pagination";

function Tickets() {
  const { page } = useSelector(store => store.pagination)
  const [sliceNums, setSliceNums] = useState({ first: 0, second: 4 })
  const [bestPrice, setBestPrice] = useState()

  useEffect(() => {
    const first = 0 + (page - 1) * 3
    const second = page * 3
    setSliceNums({ first, second })
  }, [page])

  useEffect(() => {
    const best = ticketsInfo.slice().sort((a, b) => +a.price - +b.price)[0]
    setBestPrice(best)
  }, [])

  return (
    <section className={styles.tickets}>
      {bestPrice && <Ticket price={bestPrice.price} company={bestPrice.company} image={bestPrice.image} segments={bestPrice.segments} bestPrice />}
      {ticketsInfo.slice(sliceNums.first, sliceNums.second).map((item) =>
        <Ticket price={item.price} company={item.company} image={item.image} segments={item.segments} />)}
      <Pagination />
    </section>
  )
}

export default Tickets
