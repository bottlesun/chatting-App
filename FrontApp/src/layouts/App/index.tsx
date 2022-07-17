import React from "react";
import loadable from "@loadable/component";
import { Route, Routes} from "react-router-dom";
import {MainBg, Version} from "@layouts/App/styles";
import Matching from "@components/Matching";

// 코드 스플리팅 loadable
const Login = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));

const App = () => {

  return (
    <MainBg>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/matching" element={<Matching/>}/>
      </Routes>
      <Version>V. 1.0.0</Version>
    </MainBg>
  )
}
  export default App