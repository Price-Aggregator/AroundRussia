import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from './Tickets.module.css'
import ticketsInfo from "../../utils/constants";
import Ticket from "../Ticket/Ticket";
import Pagination from "../Pagination/Pagination";

function Tickets() {
  const { page } = useSelector(store => store.pagination)
  const [sliceNums, setSliceNums] = useState({ first: 0, second: 4 })

  useEffect(() => {
    const first = 0 + (page - 1) * 4
    const second = page * 4
    setSliceNums({ first, second })
  }, [page])

  return (
    <section className={styles.tickets}>
      {ticketsInfo.slice(sliceNums.first, sliceNums.second).map((item) =>
        <Ticket price={item.price} company={item.company} image={item.image} segments={item.segments} />)}
      <Pagination />
    </section>
  )
}

export default Tickets
