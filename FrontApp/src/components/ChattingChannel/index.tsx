import React from "react";
import {ChattingChannelContainer} from "@components/ChattingChannel/styles";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import ChattingRoomList from "@components/ChattingRoomList";
import {IChannel, IUser} from "@typings/db";

const ChattingChannel = () => {
  const {data: ChannelData} = useSWR<IChannel[]>('/api/workspaces/sleact/channels', fetcher, {
    dedupingInterval: 2000, // 이 시간 범위내에 동일 키를 사용하는 요청 중복 제거
  });

  console.log(ChannelData)

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
          ChannelData?.map((channel,i) => {
            return <ChattingRoomList key={i}  {...channel} />
          })
        }

        </tbody>
      </table>
    </ChattingChannelContainer>
  )
}

export default ChattingChannel;