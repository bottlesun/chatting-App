import React, {useCallback, useState} from "react";
import {ChatPageContainer, ChatHeader} from "@pages/ChatPage/styles";
import ChatScreen from "@components/ChatScreen";
import DirectMessage from "@components/DirectMessage";
import Modal from "@components/Modal";

import gravatar from 'gravatar';
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import axios from "axios";
import {Navigate} from "react-router-dom";

const ChatPage = () => {
  const {data, mutate} = useSWR('/api/users', fetcher, {
    dedupingInterval: 2000, // 이 시간 범위내에 동일 키를 사용하는 요청 중복 제거
  });

  const imgUrl = gravatar.url(data?.id, {s: '25', r: 'x', d: 'retro'}, true);
  const [show, setShow] = useState(false);

  const oncloseModal = useCallback(() => {
    setShow(!show);
  }, [show, setShow])

  const onLogout = useCallback(() => {
    console.log('로그아웃 이벤트');
    axios.post('api/users/logout', null, {
      withCredentials: true, // 쿠키 공유
    })
      .then(() => {
        mutate(); // 정보가 false 로 바뀐다.
      })
      .catch((error) => console.log(error.response.data));
  }, [])

  if (!data) {
    return <Navigate to="/login"/>
  }

  return (
    <ChatPageContainer>
      <ChatHeader onClick={oncloseModal}>
        <img src={imgUrl} alt={data?.nickname}/>
        <h3>Hello <span>'{data?.nickname}'</span> ! <span>(1)</span></h3>
        {show &&
          <Modal onLogout={onLogout}/>
        }
      </ChatHeader>
      <ChatScreen/>
      <DirectMessage/>
    </ChatPageContainer>
  )
}
export default ChatPage;