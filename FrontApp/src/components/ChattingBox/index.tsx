import React, {FormEvent, useCallback, useEffect, useRef, useState} from "react";
import {ChatPageContainer, ChatHeader} from "@components/ChattingBox/styles";
import ChatScreen from "@components/ChatScreen";
import DirectMessage from "@components/DirectMessage";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import {FiXCircle} from "react-icons/fi";
import {Link} from "react-router-dom";
import {IChannel, IChat, IDM, IUser} from "@typings/db";
import InviteChannelModal from "@components/InviteChannelModal";
import {useParams} from "react-router";
import useInput from "@hooks/useInput";
import axios from "axios";
import makeSection from '@utils/makeSection';
import {positionValues, Scrollbars} from "react-custom-scrollbars-2";
import useSWRInfinite from "swr/infinite";
import useSocket from "@hooks/useSocket";

const PAGE_SIZE = 20;

const ChattingBox = () => {
  const {channel, workspace, id} = useParams<{ channel: string, workspace: string, id: string }>();
  const {data: myData, mutate} = useSWR('/api/users', fetcher, {
    dedupingInterval: 2000, // 이 시간 범위내에 동일 키를 사용하는 요청 중복 제거
  });

  const {data: memberData} = useSWR<IUser[]>(myData ? `/api/workspaces/${workspace}/channels/${channel}/members` : null, fetcher,);

  const {data: chatData, mutate: mutateChat, setSize} = useSWRInfinite<IChat[]>( // useSWR을 함수형태로 받아옴 , index 인자 보내줌 , setSize : 페이지수 바꾸는 역할
    (index) => `/api/workspaces/${workspace}/channels/${channel}/chats?perPage=${PAGE_SIZE}&page=${index + 1}`, fetcher);
  const [socket] = useSocket(workspace);
  const [chat, onChangeChat, setChat] = useInput('')
  const [showModal, setShowModal] = useState(false);
  const scrollbarRef = useRef<Scrollbars>(null);

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
          scrollbarRef.current?.scrollToBottom();
        })
        .catch(console.error);
    }
  }, [chat])

  // 인피니트 스크롤 시 같이 써줘야 하는 목록
  const isEmpty = chatData?.[0]?.length === 0; // 데이터가 비어있을 경우 || (끝을 나타낸 경우)
  const isReachingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length < PAGE_SIZE); // 데이터가 비어

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);
  //flat() 모든 배열의 요소를 이어붙힌다. ex) [1,2,[3,4]] -> [1,2,3,4] (2차원 배열을 1차원으로 변경)
  // reverse() 배열의 순서를 반전시킨다. ex) [1,2,3,4] -> [4,3,2,1]

  const onMessage = useCallback((data: IChat) => {
    // id는 상대방 아이디
    if (data.UserId === Number(id) && myData.id !== Number(id)) {
      mutateChat((chatData) => {
        chatData?.[0].unshift(data);
        return chatData;
      }, false).then(() => {
        if (scrollbarRef.current) {
          if (
            scrollbarRef.current.getScrollHeight() <
            scrollbarRef.current.getClientHeight() + scrollbarRef.current.getScrollTop() + 150
          ) {
            console.log('scrollToBottom!', scrollbarRef.current?.getValues());
            setTimeout(() => {
              scrollbarRef.current?.scrollToBottom();
            }, 50);
          }
        }
      });
    }
  }, []);


  useEffect(() => {
    socket?.on('dm', onMessage);

    return () => {
      socket?.off('dm', onMessage);
    }
  }, [socket, onMessage])

  // 로딩 시 스크롤바 아래로
  useEffect(() => {
    if (chatData?.length === 1) {
      scrollbarRef.current?.scrollToBottom(); // 스크롤 밑으로 내리기 (커스텀 스크롤 기능)
    }
  }, [chatData])


  return (
    <ChatPageContainer onClick={oncloseModal}>
      <ChatHeader>
        <h3>Hello <span>{channel}방</span> 입니다! <span>({memberData?.length} 명)</span></h3>
        <Link to={`/workspace/${workspace}`}><FiXCircle/></Link>
      </ChatHeader>

      <ChatScreen chatSections={chatSections}
                  ref={scrollbarRef}
                  setSize={setSize}
                  isReachingEnd={isReachingEnd}
      />

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