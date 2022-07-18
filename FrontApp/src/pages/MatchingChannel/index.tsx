import React, {useCallback, useState} from "react";
import {Container, MyProfile, Title} from "@pages/MatchingChannel/styles";
import Matching from "@components/Matching";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import gravatar from "gravatar";
import ChattingChannel from "@components/ChattingChannel";
import {Navigate} from "react-router-dom";
import axios from "axios";
import Modal from "@components/Modal";
import ChatPage from "@pages/ChatPage";

const MatchingChannel = () => {
  const {data, mutate} = useSWR('/api/users', fetcher, {
    dedupingInterval: 2000, // 이 시간 범위내에 동일 키를 사용하는 요청 중복 제거
  });
  const imgUrl = gravatar.url(data?.id, {s: '25', r: 'x', d: 'retro'}, true);
  const [show, setShow] = useState(false);
  const [test, setTest] = useState(false)

  const oncloseModal = useCallback(() => {
    setShow((prev) => !prev);
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
    <Container>
      <Title>Hello, let's chat !</Title>

      <MyProfile onClick={oncloseModal}>
        <img src={imgUrl} alt={data?.nickname}/>
        <div>
          <span>{data?.nickname} </span> 님! 방에 입장하시겠습니까?
          {show &&
            <Modal onLogout={onLogout}/>
          }
        </div>
      </MyProfile>
      <Matching/>
      <ChattingChannel/>

    </Container>
  )
}
export default MatchingChannel;