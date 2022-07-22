import React, {ChangeEvent, FormEvent, useCallback, useRef, FC, useEffect} from "react";
import {ButtonWrap, DM, Form, InviteBtn, TextArea} from "@components/DirectMessage/styles";
import Buttons from "@components/Buttons";
import autosize from "autosize";

interface Props {
  onClickInviteChattingRoom: (e: React.MouseEvent) => void;
  chat?: string;
  onSubmitForm: (e: any) => void;
  onChangeChat: (e: any) => void;
  placeholder?: string;
}

const DirectMessage: FC<Props> = ({onClickInviteChattingRoom, chat, onSubmitForm, onChangeChat, placeholder}) => {
  const TextAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if(TextAreaRef.current){
      autosize(TextAreaRef.current)
    }
  },[])

  const onkeydownChat = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault()
        onSubmitForm(e)
      }
    }
  }, [onSubmitForm])


  return (
    <DM>
      <Form onSubmit={onSubmitForm}>
        <TextArea
          id="editor-chat"
          placeholder="채팅을 입력해주세요"
          value={chat}
          onChange={onChangeChat}
          onKeyDown={onkeydownChat}
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