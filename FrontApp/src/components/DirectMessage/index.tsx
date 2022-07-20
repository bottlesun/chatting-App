import React, {ChangeEvent, FormEvent, useCallback, useRef, FC} from "react";
import {ButtonWrap, DM, Form, InviteBtn, TextArea} from "@components/DirectMessage/styles";
import Buttons from "@components/Buttons";
import {DMdataStore} from "@store/DMdata.store";

interface ClickRoom {
  onClickInviteChattingRoom: (e:React.MouseEvent) => void
}

const DirectMessage: FC<ClickRoom> = ({onClickInviteChattingRoom}) => {
  const useStore = DMdataStore((state) => state);
  const TextAreaRef = useRef<HTMLTextAreaElement>(null);

  const {chatData, setChatData} = useStore;

  const onChangeChat = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setChatData(e.target.value);
  }, [setChatData, chatData]);

  const onsubmitChatFrom = useCallback((e: FormEvent<HTMLFormElement>) => {
    // DM 보내기
    e.preventDefault()
    if (!chatData) return;
    console.log('onsubmitChatFrom : ', chatData)
    setChatData("");
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

        <ButtonWrap>
          <Buttons type="submit" disabled={false} children="전송"/>
          <InviteBtn onClick={onClickInviteChattingRoom}>초대</InviteBtn>
        </ButtonWrap>
      </Form>
    </DM>
  )
}

export default DirectMessage;