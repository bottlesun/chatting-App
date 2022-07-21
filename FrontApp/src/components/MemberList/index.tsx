import React from "react";
import {MemberListWrap} from "@components/MemberList/styles";
import {useParams} from "react-router";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import {IChannel, IUser} from "@typings/db";

const MemberList = () => {
  const {channel} = useParams<{ channel: string }>();
  const {data: userData, mutate} = useSWR('/api/users', fetcher, {
    dedupingInterval: 2000, // 이 시간 범위내에 동일 키를 사용하는 요청 중복 제거
  });
  const {data: member, mutate: revalidateMembers} = useSWR<IUser[]>(
    userData ? `/api/workspaces/sleact/channels/${channel}/members` : null,
    fetcher,
  );

  return (
    <MemberListWrap>
      <ul>
        {
          member?.map((list) => {
            return <li key={list.id}><span></span>{list.nickname}</li>
          })
        }
      </ul>
    </MemberListWrap>
  )
}

export default MemberList