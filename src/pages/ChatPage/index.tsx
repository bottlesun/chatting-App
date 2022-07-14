import React from "react";
import {ChatPageContainer, ChatHeader} from "@pages/ChatPage/styles";
import {matchingStore} from "@store/matching.store";
import ChatScreen from "@components/ChatScreen";
import DirectMessage from "@components/DirectMessage";
import gravatar from 'gravatar';

const ChatPage = () => {
  const NickName = matchingStore((state) => state.nickName);
  const imgUrl = gravatar.url(NickName, {s: '25', r: 'x', d: 'retro'}, true);
  return (
    <ChatPageContainer>
      <ChatHeader>
        <img src={imgUrl} alt={NickName}/>
        <h3>Hello <span>'{NickName}'</span> ! <span>(1)</span></h3>
      </ChatHeader>
      <ChatScreen/>
      <DirectMessage/>
    </ChatPageContainer>
  )
}
export default ChatPage;