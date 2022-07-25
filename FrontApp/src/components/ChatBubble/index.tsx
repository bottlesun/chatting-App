import React, {FC, useMemo} from "react";
import {BubbleContainer} from "@components/ChatScreen/styles";
import {IChannel, IChat, IDM} from "@typings/db";
import gravatar from "gravatar";
import dayjs from "dayjs";
import regexifyString from "regexify-string";
import {Link, useParams} from 'react-router-dom';
import {channel} from "diagnostics_channel";

interface ChatBubble {
  data: IChat
}

const ChatBubble: FC<ChatBubble> = ({data}) => {
  const BACK_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3095' : 'https://sleact.nodebird.com';
  const {workspace, channel} = useParams<{ workspace: string; channel: string }>();
  const user = data.User;

  const result = useMemo<(string | JSX.Element)[] | JSX.Element>(
    () => // uploads 서버주소 문자열 \ 를 표현할땐 \\ 로 표현
      data.content.startsWith('uploads\\') || data.content.startsWith('uploads/') ? (
        <img src={`${BACK_URL}/${data.content}`} style={{maxHeight: 200}}/>
      ) : (
        regexifyString({
          pattern: /@\[(.+?)]\((\d+?)\)|\n/g,
          decorator(match, index) {
            const arr: string[] | null = match.match(/@\[(.+?)]\((\d+?)\)/)!;
            if (arr) {
              return (
                <Link key={match + index} to={`/workspace/${workspace}/channels/${channel}`}>
                  @{arr[1]}
                </Link>
              );
            }
            return <br key={index}/>;
          },
          input: data.content,
        },)
      ),
    [workspace, data.content],
  );
  return (
    <BubbleContainer>
      <div className="nickNamesWrap">
        <img src={gravatar.url(user.email, {s: '20px', d: 'retro'})} alt={user.nickname}/>
        <div className='nickNames'>
          {user.nickname}
          {dayjs(data.createdAt).format(' - A h:mm')}
        </div>
      </div>

      <div className='bubble'>
        {result}
      </div>
    </BubbleContainer>
  )
}

export default ChatBubble