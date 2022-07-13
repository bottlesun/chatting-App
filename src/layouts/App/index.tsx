import React from "react";
import {Route, Routes} from "react-router-dom";
import ChatPage from "@pages/ChatPage";
import {MainBg} from "@layouts/App/styles";

const App = () => {
  return (
    <MainBg>
      <Routes>
        <Route path="/" element={<ChatPage/>}/>
      </Routes>
    </MainBg>

  )
}
export default App