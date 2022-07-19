import React, {useCallback, useState} from "react";
import {ChatPageContainer, ChatHeader} from "@pages/ChattingComponent/styles";
import ChatScreen from "@components/ChatScreen";
import DirectMessage from "@components/DirectMessage";
import gravatar from 'gravatar';
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { FiXCircle } from "react-icons/fi";
import {Navigate,Link} from "react-router-dom";

const ChattingComponent = () => {
  const {data, mutate} = useSWR('/api/users', fetcher, {
    dedupingInterval: 2000, // 이 시간 범위내에 동일 키를 사용하는 요청 중복 제거
  });

  const imgUrl = gravatar.url(data?.id, {s: '25', r: 'x', d: 'retro'}, true);


  if (!data) {
    return <Navigate to="/login"/>
  }

  return (
    <ChatPageContainer>
      <ChatHeader>
        <img src={imgUrl} alt={data?.nickname}/>
        <h3>Hello <span>'{data?.nickname}'</span> ! <span>(1)</span></h3>
          <Link to="/Matching"><FiXCircle/></Link>
      </ChatHeader>
      <ChatScreen/>
      <DirectMessage/>
    </ChatPageContainer>
  )
}
export default ChattingComponent;