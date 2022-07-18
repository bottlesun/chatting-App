import React, {useState} from "react";
import {Screen} from "@components/ChatScreen/styles";
import ChatBubble from "@components/ChatBubble";

const ChatScreen = () => {


  return (
    <Screen>
      <ChatBubble/>
    </Screen>
  )
}

export default ChatScreen;