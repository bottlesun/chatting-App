import React, {FormEvent, useCallback, useState} from "react";
import {ChatPageContainer, ChatHeader} from "@components/ChattingBox/styles";
import ChatScreen from "@components/ChatScreen";
import DirectMessage from "@components/DirectMessage";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import {FiXCircle} from "react-icons/fi";
import {Link} from "react-router-dom";
import { IDM, IUser } from "@typings/db";
import InviteChannelModal from "@components/InviteChannelModal";
import {useParams} from "react-router";
import useInput from "@hooks/useInput";
import axios from "axios";

const PAGE_SIZE = 20;

const ChattingBox = () => {
  const {channel, workspace , id} = useParams<{ channel: string, workspace: string, id:string }>();
  const {data: myData, mutate} = useSWR('/api/users', fetcher, {
    dedupingInterval: 2000, // 이 시간 범위내에 동일 키를 사용하는 요청 중복 제거
  });

  const { data: memberData } = useSWR<IUser[]>(myData ? `/api/workspaces/${workspace}/channels/${channel}/members` : null, fetcher,);

  const {
    data: chatData,
    mutate: mutateChat
  } = useSWR<IDM[]>(`/api/workspaces/${workspace}/channels/${channel}/chats?perPage=${PAGE_SIZE}&page=1`, fetcher
  );
  const [chat, onChangeChat, setChat] = useInput('')

  const [showModal, setShowModal] = useState(false);

  const oncloseModal = useCallback(() => {
    setShowModal(false);
  }, [showModal, setShowModal])

  const onClickInviteChattingRoom = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal((prev) => !prev);
  }, []);


  const onSubmitForm = useCallback((e: FormEvent<HTMLFormElement>) => {
    //DM 보내기
    e.preventDefault();

    if (chat?.trim()) {
      axios.post(`/api/workspaces/${workspace}/channels/${channel}/chats`, {
        content: chat,
      })
        .then(() => {
          mutateChat()
          setChat('');
        })
        .catch(console.error);
    }
  }, [chat])




  return (
    <ChatPageContainer onClick={oncloseModal}>
      <ChatHeader>
        <h3>Hello <span>{channel}방</span> 입니다! <span>({memberData?.length} 명)</span></h3>
        <Link to={`/workspace/${workspace}`}><FiXCircle/></Link>
      </ChatHeader>
      <ChatScreen/>
      <DirectMessage onClickInviteChattingRoom={onClickInviteChattingRoom} chat={chat} onChangeChat={onChangeChat}
                     onSubmitForm={onSubmitForm}/>
      {
        showModal &&
        <InviteChannelModal showModal={showModal} setShowModal={setShowModal}/>
      }
    </ChatPageContainer>
  )
}
export default ChattingBox;