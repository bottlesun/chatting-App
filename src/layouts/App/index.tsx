import React from "react";
import {Route, Routes } from "react-router-dom";
import {MainBg, Version} from "@layouts/App/styles";
import ChatPage from "@pages/ChatPage";
import MatchingPage from "@pages/MatchingPage";
import {matchingStore} from "@store/matching.store";


const App = () => {
  const login = matchingStore((state) => state.login);


  return (
    <MainBg>
      <Routes>
        <Route path="/" element={<MatchingPage/>}/>
        <Route path="/chat" element={<ChatPage/>}/>
      </Routes>
      <Version>V. 1.0.0</Version>
    </MainBg>
  )
}
export default App