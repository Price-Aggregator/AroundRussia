import React, { useState } from "react";
import styles from './TravelPlan.module.css'

function TravelPlanBox() {
  const [wrap, setWrap] = useState(false)

  return <div className={styles.box}>
    <div className={styles.dateBox}>
      <h2 className={styles.date}>21 июля, Пн</h2>
      <button type="button" className={wrap ? styles.triangle : styles.triangleClose} onClick={() => setWrap(!wrap)}> </button>
    </ div>
    {wrap && <div>
      <h3>h3</h3>
    </div>}
  </div>
}

export default TravelPlanBox
