import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Search from "../components/Search/Search";
import Text from "../components/Text/Text";
import Questions from "../components/Questions/Questions";
import Diary from "../components/Diary/Diary";
import { faq } from "../utils/constants";
import { getUserAuth } from "../store/User/selectors";

function MainPage() {
  const isAuth = useSelector(getUserAuth)
  const navigation = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/";


  useEffect(() => {
    if (isAuth) {
      navigation(from, { replace: true })
    }
  }, [isAuth])

  return (
    <>
      <Search />
      <Text />
      <Diary />
      <Questions data={faq} />
    </>
  )
}

export default MainPage
