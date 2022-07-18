import React, {useCallback, useRef, useState} from "react";
import {Navigate} from 'react-router-dom';
import {Form, MatchingContainer} from "@components/Matching/styles";
import Buttons from "@components/Buttons";
import axios from "axios";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import gravatar from "gravatar";
import {workerData} from "worker_threads";

const Matching = () => {
  const {data, error, mutate} = useSWR('/api/users', fetcher, {
    dedupingInterval: 2000, // 이 시간 범위내에 동일 키를 사용하는 요청 중복 제거
  });
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value)
  }, [setInputText])

  const onSubmitForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputRef.current;
    if (input?.value === "" || input?.value === null) return;
    console.log('채널이동');

    setInputText('');
  }, [setInputText, inputRef])

  return (
    <MatchingContainer>
      <Form onSubmit={onSubmitForm}>
        <input ref={inputRef}
               value={inputText}
               onChange={onChange}
               type="text"
               placeholder="채팅방을 생성하세요."/>
        <Buttons disabled={false} children="Join"/>
      </Form>
    </MatchingContainer>
  )
}

export default Matching;