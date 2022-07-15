import React, {useState} from "react";
import {Screen} from "@components/ChatScreen/styles";
import {DMdataStore} from "@store/DMdata.store";
import {matchingStore} from "@store/matching.store";
import ChatBubble from "@components/ChatBubble";

const ChatScreen = () => {
  const DMStore = DMdataStore(state => state);
  const MatchingStore = matchingStore(state=>state);
  const {chatData, setChatData} = DMStore;
  const {nickName} = MatchingStore
  const [chatView,setChatView] = useState<string[]>([]);

  if(!(chatData === undefined)){
  }

  return (
    <Screen>
      <ChatBubble/>
    </Screen>
  )
}

export default ChatScreen;