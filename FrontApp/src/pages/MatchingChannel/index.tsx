import React, {useCallback, useState} from "react";
import {Container, MyProfile, Title} from "@pages/MatchingChannel/styles";
import Matching from "@components/Matching";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import gravatar from "gravatar";
import ChattingChannel from "@components/ChattingChannel";
import {Navigate, Route, Routes} from "react-router-dom";
import axios from "axios";
import Modal from "@components/Modal";
import {IChannel} from "@typings/db";
import {useParams} from "react-router";


const MatchingChannel = () => {
  const {data: userData, mutate} = useSWR('/api/users', fetcher, {
    dedupingInterval: 2000, // 이 시간 범위내에 동일 키를 사용하는 요청 중복 제거
  });
  const imgUrl = gravatar.url(userData?.id, {s: '25', r: 'x', d: 'retro'}, true);
  const [show, setShow] = useState(false);

  const oncloseModal = useCallback(() => {
    setShow(false);
  }, [show, setShow])

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShow((prev) => !prev);
  }, [])

  const onLogout = useCallback(() => {
    console.log('로그아웃 이벤트');
    axios.post('/api/users/logout', null, {
      withCredentials: true, // 쿠키 공유
    })
      .then(() => {
        mutate(); // 정보가 false 로 바뀐다.
      })
      .catch((error) => console.log(error.response.data));
  }, [mutate, userData])

  if (!userData) {
    return <Navigate to="/login"/>
  }

  return (
    <Container onClick={oncloseModal}>
      <Title>Hello, let's chat !</Title>

      <MyProfile onClick={stopPropagation}>
        <img src={imgUrl} alt={userData?.nickname}/>
        <div>
          <span>{userData?.nickname} </span> 님! 방에 입장하시겠습니까?
          {show &&
            <Modal style={{top: 30, left: 0}} onLogout={onLogout}/>
          }
        </div>
      </MyProfile>
      <Matching/>
      <ChattingChannel/>
    </Container>
  )
}
export default MatchingChannel;