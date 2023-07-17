import React from "react";
import PropTypes from 'prop-types';
import styles from './TravelPlan.module.css'
import TravelPlanBox from "./TravelPlanBox";

function TravelPlan({ travelPlan }) {

  return <div className={styles.travel}>
    {travelPlan && travelPlan.map((item, index) => (
      // eslint-disable-next-line
      <TravelPlanBox day={item} key={index} />
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
