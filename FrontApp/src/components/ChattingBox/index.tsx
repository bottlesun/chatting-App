import React, {FormEvent, useCallback, useState} from "react";
import {ChatPageContainer, ChatHeader} from "@components/ChattingBox/styles";
import ChatScreen from "@components/ChatScreen";
import DirectMessage from "@components/DirectMessage";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import {FiXCircle} from "react-icons/fi";
import {Link} from "react-router-dom";
import {IChannel, IUser} from "@typings/db";
import InviteChannelModal from "@components/InviteChannelModal";
import {useParams} from "react-router";
import useInput from "@hooks/useInput";

const ChattingBox = () => {
  const {channel, id} = useParams<{ channel: string, id: string }>();
  const [newMember, onChangeNewMember, setNewMember] = useInput('');
  const {data: myData, mutate} = useSWR('/api/users', fetcher, {
    dedupingInterval: 2000, // 이 시간 범위내에 동일 키를 사용하는 요청 중복 제거
  });

  // const {data: userData} = useSWR(`/api/workspaces/sleact/users/${id}`, fetcher);
  const {data: channelData} = useSWR<IChannel[]>('/api/workspaces/sleact/channels', fetcher);
  const {data: member, mutate: revalidateMembers} = useSWR<IUser[]>(
    myData ? `/api/workspaces/sleact/channels/${channel}/members` : null,
    fetcher,
  );


  const [chat, onChangeChat,setChat] = useInput('')

  const [showModal, setShowModal] = useState(false);

  const oncloseModal = useCallback(() => {
    setShowModal(false);
  }, [showModal, setShowModal])

  const onClickInviteChattingRoom = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal((prev) => !prev);
  }, []);

  const onSubmitForm = useCallback((e:FormEvent<HTMLFormElement>) => {
    //DM보내기
    e.preventDefault();
    console.log('submit')
    setChat('')
  }, [])


  return (
    <ChatPageContainer onClick={oncloseModal}>
      <ChatHeader>
        <h3>Hello <span>{channel}방</span> 입니다! <span>({member?.length} 명)</span></h3>
        <Link to="/matching"><FiXCircle/></Link>
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