import React from "react";
import styles from './TravelPlan.module.css'
import TravelPlanBox from "./TravelPlanBox";

function TravelPlan() {
  return <div className={styles.travel}>
    <TravelPlanBox />
    <TravelPlanBox />
  </div>


}

export default TravelPlan
