import React, {FC, useCallback, useRef, useState} from "react";
import {BubbleContainer, Screen} from "@components/ChatScreen/styles";
import {IChat} from "@typings/db";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import {useParams} from "react-router";
import ChatBubble from "@components/ChatBubble";
import { Scrollbars } from 'react-custom-scrollbars-2';


const PAGE_SIZE = 20;

const ChatScreen = () => {
  const {channel, workspace , id} = useParams<{ channel: string, workspace: string, id:string }>();

  const {
    data: chatData,
    mutate: mutateChat
  } = useSWR<IChat[]>(`/api/workspaces/${workspace}/channels/${channel}/chats?perPage=${PAGE_SIZE}&page=1`, fetcher
  );

  const scrollRef = useRef(null);

  const onScroll = useCallback(() =>{
    scrollRef.current
  } ,[])

  return (
    <Scrollbars ref={scrollRef} autoHeight autoHeightMin={400} onScrollFrame={onScroll} >
      <Screen>
        {
          chatData?.map((chat) => <ChatBubble key={chat.id} data={chat} /> )
        }
      </Screen>
    </Scrollbars>
  )
}

export default ChatScreen;