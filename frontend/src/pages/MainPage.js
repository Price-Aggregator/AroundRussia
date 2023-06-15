import React from "react";
import Search from "../components/Search/Search";
import Text from "../components/Text/Text";
import Questions from "../components/Questions/Questions";
import { faq } from "../utils/constants";

function MainPage() {
  return (
    <>
      <Search />
      <Text />
      <Questions data={faq} />
    </>
  )
}

export default MainPage
