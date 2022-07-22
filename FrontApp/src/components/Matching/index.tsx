import React, {useCallback, useRef, useState} from "react";
import {Form, MatchingContainer} from "@components/Matching/styles";
import Buttons from "@components/Buttons";
import axios from "axios";
import {useParams} from "react-router";
import useSWR from "swr";
import {IChannel, IUser} from "@typings/db";
import fetcher from "@utils/fetcher";


const Matching = () => {
  const {workspace} = useParams<{ workspace: string }>();
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {data: ChannelData,mutate:channelMutate} = useSWR<IChannel[]>(`/api/workspaces/${workspace}/channels`, fetcher, {
    dedupingInterval: 2000, // 이 시간 범위내에 동일 키를 사용하는 요청 중복 제거
  });

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value)
  }, [setInputText])

  const onClickAddChat = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputRef.current;
    if (input?.value === "" || input?.value === null) return;
    axios.post(`/api/workspaces/${workspace}/channels`, { // useParams
      name: inputText, // 새로운 채널 명
    }, {
      withCredentials: true // 누가 생성했는지 * 쿠키공유
    }).then(() => {
      channelMutate();
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