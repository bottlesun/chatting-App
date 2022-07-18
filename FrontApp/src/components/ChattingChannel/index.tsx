import React from "react";
import {ChattingChannelContainer} from "@components/ChattingChannel/styles";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import ChattingRoomList from "@components/ChattingRoomList";

const ChattingChannel = () => {
  const {data: ChannelData} = useSWR('/api/workspaces', fetcher, {
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
          ChannelData?.map((v: string[] | undefined, i: number) => {
            return <ChattingRoomList key={i} />
          })
        }

        </tbody>
      </table>
    </ChattingChannelContainer>
  )
}

export default ChattingChannel;