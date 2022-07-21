import React from "react";
import {ChattingWrap} from "@pages/ChattingComponent/styles";

import ChattingBox from "@components/ChattingBox";
import MemberList from "@components/MemberList";

const ChattingComponent = () => {
  return (
    <ChattingWrap>
      <MemberList/>
      <ChattingBox/>
    </ChattingWrap>
  )
}
export default ChattingComponent;