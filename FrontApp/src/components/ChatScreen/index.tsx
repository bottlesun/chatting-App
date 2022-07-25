import React, {forwardRef, MutableRefObject, useCallback} from "react";
import {Screen, StickyHeader, Section} from "@components/ChatScreen/styles";
import {IChat} from "@typings/db";

import ChatBubble from "@components/ChatBubble";
import {positionValues, Scrollbars} from 'react-custom-scrollbars-2';


interface Props {
  chatSections: { [key: string]: (IChat)[] },
  setSize: (f: (index: number) => number) => Promise<(IChat)[][] | undefined>;
  isReachingEnd?: boolean;
}

const ChatScreen = forwardRef<Scrollbars, Props>(({chatSections, setSize, isReachingEnd},scrollbarRef) => {

  const onScroll = useCallback((values: positionValues) => {
    if (values.scrollTop === 0 && !isReachingEnd) {
      console.log('가장 위');
      // 추가 데이터 생성
      setSize((prevSize) => prevSize + 1).then(() => {
        // 스크롤 위치 유지
        // 스크롤이 최 상단일 경우 페이지를 추가
        const current = (scrollbarRef as MutableRefObject<Scrollbars>)?.current;
        if (current) {
          current?.scrollTop(current?.getScrollHeight() - (values.scrollHeight));
          // 현재 스크롤 높이 - 전체 스크롤 높이
        }

      })
    }
  }, [])

  return (
    <Scrollbars ref={scrollbarRef} autoHeight autoHeightMin={400} onScrollFrame={onScroll}>
      <Screen>
        {Object.entries(chatSections).map(([date, chats]) => { // Object.entries(objectName) 객체를 반복문 돌때 사용 , 객체가 배열로 바뀜
          return (
            <Section className={`section-${date}`} key={date}>
              <StickyHeader> {/* position sticky  - fixed 처럼 따라오다 상단에 붙어 버린다.*/}
                <button>{date}</button>
              </StickyHeader>
              {chats.map((chat) => (
                <ChatBubble key={chat.id} data={chat}/>
              ))}
            </Section>
          );
        })}
      </Screen>
    </Scrollbars>
  )
})

export default ChatScreen;