import React from "react";
import { useDispatch } from "react-redux";
import Search from "../components/Search/Search";
import Text from "../components/Text/Text";
import Questions from "../components/Questions/Questions";
import { faq } from "../utils/constants";
import { getCities } from "../store/Cities/slice";

function MainPage() {
  const dispatch = useDispatch()
  

  dispatch(getCities())

  return (
    <>
      <Search />
      <Text />
      <Questions data={faq} />
    </>
  )
}

export default MainPage
