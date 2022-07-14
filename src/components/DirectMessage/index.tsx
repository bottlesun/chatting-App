import React from "react";
import {DM} from "@components/DirectMessage/styles";
import Buttons from "@components/Buttons";

const DirectMessage = () => {
  return (
    <DM>
      <Buttons disabled={false} children="전송"/>
    </DM>
  )
}

export default DirectMessage;