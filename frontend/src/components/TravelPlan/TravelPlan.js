import React from "react";
import PropTypes from 'prop-types';
import styles from './TravelPlan.module.css'
import TravelPlanBox from "./TravelPlanBox";

function TravelPlan({ travelPlan }) {
  const datesOfTravel = [... new Set(travelPlan.map((item) => item.date))].sort((a, b) => a > b)

  return <div className={styles.travel}>
    {datesOfTravel && datesOfTravel.map((item) => (
      // eslint-disable-next-line
      <TravelPlanBox day={item} key={item.id} activities={travelPlan} />
    ))}
  </div>
}

TravelPlan.propTypes = {
  travelPlan: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object
  ])).isRequired
}

export default TravelPlan
