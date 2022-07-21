import React from "react";
import loadable from "@loadable/component";
import {Route, Routes} from "react-router-dom";
import {MainBg, Version} from "@layouts/App/styles";

// 코드 스플리팅 loadable
const Login = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));
const MatchingChannel = loadable(() => import('@pages/MatchingChannel'))
const ChattingComponent = loadable(() => import('@pages/ChattingComponent'))

const App = () => {

  return (
    <MainBg >
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/matching" element={<MatchingChannel/>}/>
        <Route path="/matching/sleact/channels/:channel" element={<ChattingComponent/>}/>
      </Routes>
      <Version>V. 1.0.0</Version>
    </MainBg>
  )
}
export default App