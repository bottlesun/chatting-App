import React, {useCallback, useRef, useState} from "react";
import {Navigate} from 'react-router-dom';
import {Form, MatchingContainer} from "@components/Matching/styles";
import {matchingStore} from "@store/matching.store";
import {MatchingStoreInterface} from "@typings/matchingStore.interface";
import Buttons from "@components/Buttons";
import axios from "axios";

const Matching = () => {
  const useStore = matchingStore<MatchingStoreInterface>((state) => state);
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {login, toggleLogin, setNickName} = useStore;

  const onSubmitForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputRef.current;

    if (input?.value === "" || input?.value === null) return;

    setNickName(input!.value)
    setInputText('');
    toggleLogin(!login);
  }, [setInputText, inputRef, toggleLogin, login])

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value)

  }, [setInputText])



  return (
    <MatchingContainer>
      <Form onSubmit={onSubmitForm}>
        <input ref={inputRef}
               value={inputText}
               onChange={onChange}
               type="text"
               placeholder="이름을 입력하세요."/>
        <Buttons disabled={false} children="Join"/>
      </Form>
    </MatchingContainer>
  )
}

export default Matching;