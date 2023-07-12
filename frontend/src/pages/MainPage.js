import React from "react";
import Search from "../components/Search/Search";
import Text from "../components/Text/Text";
import Questions from "../components/Questions/Questions";
import Diary from "../components/Diary/Diary";
import { faq } from "../utils/constants";

function MainPage() {


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
