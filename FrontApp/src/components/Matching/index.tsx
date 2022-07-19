import React, {useCallback, useRef, useState} from "react";
import {Form, MatchingContainer} from "@components/Matching/styles";
import Buttons from "@components/Buttons";
import axios from "axios";
import useInput from "@hooks/useInput";
import {useParams} from "react-router";
import useSWR from "swr";
import {IChannel, IUser} from "@typings/db";
import fetcher from "@utils/fetcher";


const Matching = () => {
  const [inputText, setInputText] = useState('');
  const {workspace, channel} = useParams<{ workspace: string, channel: string }>(); // :파라미터 값을 불러온다
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {data: channelData,mutate} = useSWR<IChannel>( // 로그인 하지 않은 상태면 null 로 이동
    `api/workspaces/sleact/channels`, fetcher);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value)
  }, [setInputText])

  const onClickAddChat = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputRef.current;
    if (input?.value === "" || input?.value === null) return;
    axios.post(`api/workspaces/sleact/channels`, { // useParams
      name: inputText, // 새로운 채널 명
    }, {
      withCredentials: true // 누가 생성했는지 * 쿠키공유
    }).then(() => {
      mutate();
      setInputText('');
    }).catch((error) => console.dir(error))
  }, [setInputText, inputRef, inputText])


  return (
    <MatchingContainer>
      <Form onSubmit={onClickAddChat}>
        <input ref={inputRef}
               value={inputText}
               onChange={onChange}
               type="text"
               placeholder="채팅방을 생성하세요."/>
        <Buttons type="submit" disabled={false} children="Join"/>
      </Form>
    </MatchingContainer>
  )
}

export default Matching;