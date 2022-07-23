import React, {useState, useEffect, useCallback} from "react";
import {ChattingWrap, MemberListWrap} from "@pages/ChattingComponent/styles";
import ChattingBox from "@components/ChattingBox";
import MemberList from "@components/MemberList";
import {Navigate, useParams} from "react-router-dom";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import {IUser, IUserWithOnline} from "@typings/db";


const ChattingComponent = () => {
  const {workspace, id, channel} = useParams<{ workspace: string, id: string, channel: string }>();
  const {data: userData, mutate} = useSWR('/api/users', fetcher, {
    dedupingInterval: 2000, // 이 시간 범위내에 동일 키를 사용하는 요청 중복 제거
  });

  const {data: memberData} = useSWR<IUser[]>(userData ? `/api/workspaces/${workspace}/channels/${channel}/members` : null, fetcher);
  const {data: onlineData} = useSWR<IUserWithOnline>(userData ? `/api/workspaces/${workspace}/members` : null, fetcher);
  const [onlineList, setOnlineList] = useState<number[]>([]);

  if (userData === undefined) {
    return <div>...로딩중</div>
  }

  if (!userData) {
    return <Navigate to="/login"/>
  }

  return (
    <ChattingWrap>
      <MemberListWrap>
        {
          memberData?.map((member) => {
            const isOnline = onlineList.includes(member.id);
            return <MemberList key={member.id} member={member} isOnline={isOnline}/>

          })
        }
      </MemberListWrap>
      <ChattingBox/>
    </ChattingWrap>
  )
}
export default ChattingComponent;