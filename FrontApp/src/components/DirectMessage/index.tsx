import React, {ChangeEvent, FormEvent, useCallback, useRef, useState} from "react";
import {DM, Form, TextArea} from "@components/DirectMessage/styles";
import Buttons from "@components/Buttons";
import {DMdataStore} from "@store/DMdata.store";

const DirectMessage = () => {
  const useStore = DMdataStore((state) => state);
  const TextAreaRef = useRef<HTMLTextAreaElement>(null);

  const {chatData, setChatData} = useStore;

  const onChangeChat = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setChatData(e.target.value);
  }, [setChatData, chatData]);

  const onsubmitChatFrom = useCallback((e: FormEvent<HTMLFormElement>) => {
    // DM 보내기
    e.preventDefault()
    if(!chatData) return;
    console.log('onsubmitChatFrom : ', chatData)
    setChatData("");0
  }, [chatData, setChatData])

  return (
    <DM>
      <Form onSubmit={onsubmitChatFrom}>
        <TextArea
          placeholder="채팅을 입력해주세요"
          value={chatData}
          onChange={onChangeChat}
          ref={TextAreaRef}
        >
        </TextArea>

        <Buttons disabled={false} children="전송"/>
      </Form>
    </DM>
  )
}

export default DirectMessage;