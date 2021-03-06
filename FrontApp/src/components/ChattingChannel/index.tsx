import React from "react";
import {ChattingChannelContainer} from "@components/ChattingChannel/styles";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import ChattingRoomList from "@components/ChattingRoomList";
import {IChannel, IUser} from "@typings/db";
import {useParams} from "react-router-dom";

const ChattingChannel = () => {
  const {workspace} = useParams<{ workspace: string }>();
  const {data: ChannelData} = useSWR<IChannel[]>(`/api/workspaces/${workspace}/channels`, fetcher, {
    dedupingInterval: 2000, // 이 시간 범위내에 동일 키를 사용하는 요청 중복 제거
  });

  return (
    <ChattingChannelContainer>
      <table>
        <thead>
        <tr>
          <th>방번호</th>
          <th>제목</th>
          <th>입장</th>
        </tr>
        </thead>

        <tbody>
        {
          ChannelData?.map((channels, i) => {
            return <ChattingRoomList key={i}  {...channels} />
          })
        }
        </tbody>
      </table>
    </ChattingChannelContainer>
  )
}

export default ChattingChannel;