import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from "react-redux";
import { setPage } from "../../store/Pagination/slice";
import { getPage, getPages } from "../../store/Pagination/selectors";
import styles from './Pagination.module.css'

function PageNumber({ page, isActive }) {
  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(setPage(page))
  }
  return (
    <li className={`${styles.page__number} ${isActive && styles.page__active}`} >
      <button onClick={onClick} type="button" className={styles.page_button}>{page}</button>
    </li>
  )
}


function Pagination() {
  const pages = useSelector(getPages)
  const page = useSelector(getPage)
  const [pagesArr, setPagesArr] = useState([])

  useEffect(() => {
    const array = Array(pages).fill(1).map((item, index) => item + index)
    setPagesArr(array)
  }, [pages])

  return (
    <ul className={styles.pagination}>
      {pagesArr && pagesArr.map((item) =>
        <PageNumber page={item} isActive={item === page} key={item} />
      )}
    </ul>
  )
}

PageNumber.propTypes = {
  page: PropTypes.number.isRequired,
  isActive: PropTypes.bool
}

PageNumber.defaultProps = {
  isActive: false
}

export default Pagination
