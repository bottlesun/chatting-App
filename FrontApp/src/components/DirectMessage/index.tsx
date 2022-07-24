import React, {useCallback, useRef, FC, useEffect} from "react";
import {ButtonWrap, DM, Form, InviteBtn, TextArea , EachMention} from "@components/DirectMessage/styles";
import Buttons from "@components/Buttons";
import autosize from "autosize";
import {Mention, SuggestionDataItem} from 'react-mentions'
import useSWR from "swr";
import {IUser} from "@typings/db";
import fetcher from "@utils/fetcher";
import {useParams} from "react-router-dom";
import gravatar from "gravatar";

interface Props {
  onClickInviteChattingRoom: (e: React.MouseEvent) => void;
  chat?: string;
  onSubmitForm: (e: any) => void;
  onChangeChat: (e: any) => void;
  placeholder?: string;
}

const DirectMessage: FC<Props> = ({onClickInviteChattingRoom, chat, onSubmitForm, onChangeChat, placeholder}) => {
  const {workspace} = useParams();
  const {data: myData} = useSWR('/api/users', fetcher,);
  const { data: memberData } = useSWR<IUser[]>(myData ? `/api/workspaces/${workspace}/members` : null, fetcher,);
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


  const renderUserSuggestion: (
    suggestion: SuggestionDataItem,
    search: string,
    highlightedDisplay: React.ReactNode,
    index: number,
    focused: boolean
  ) => React.ReactNode = useCallback(
    (member, search, highlightedDisplay, index, focus) => {
      if (!memberData) {return null}
      return (
        <EachMention focus={focus}>
          <img src={gravatar.url(memberData[index].email, { s: '20px', d: 'retro' })} alt={memberData[index].nickname} />
          <span>{highlightedDisplay}</span>
        </EachMention>
      );
    },
    [memberData],
  );

  return (
    <DM>
      <Form onSubmit={onSubmitForm}>

        <TextArea
          id="editor-chat"
          placeholder="채팅을 입력해주세요"
          value={chat}
          onChange={onChangeChat}
          onKeyDown={onkeydownChat}
          inputRef={TextAreaRef}
          allowSuggestionsAboveCursor
        >
          <Mention
            trigger="@"
            appendSpaceOnAdd
            data={memberData?.map((v) => ({ id: v.id, display: v.nickname })) || []}
            renderSuggestion={renderUserSuggestion}
          />
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