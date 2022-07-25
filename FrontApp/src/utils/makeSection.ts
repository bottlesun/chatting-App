import {IDM , IChat} from '@typings/db';
import dayjs from 'dayjs';

export default function makeSection(chatList : ( IChat)[]) {
  const sections : {[key:string] : ( IChat)[]} = {};
  chatList.forEach((chat) => { // 받아오는 채팅 리스트의 요소를 빼내서
    const monthDate = dayjs(chat.createdAt).format('YYYY-MM-DD');
    if(Array.isArray(sections[monthDate])) { // section[monthDate] 값인 경우에는 push chat 아닌 경우에는 [chat] 생성
      sections[monthDate].push(chat);
    } else {
      sections[monthDate] = [chat];
    }
  });

  return sections;
}


// 알고리즘 , 사람이 생각하는대로 하면 반은 간다.