import React, {useState, useEffect, useCallback} from "react";
import {ChattingWrap} from "@pages/ChattingComponent/styles";
import ChattingBox from "@components/ChattingBox";
import MemberList from "@components/MemberList";
import {Navigate, useParams} from "react-router-dom";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import useSocket from "@hooks/useSocket";

const ChattingComponent = () => {
  const {workspace} = useParams<{ workspace: string }>();
  const [socket] = useSocket(workspace);
  const {data: userData, mutate} = useSWR('/api/users', fetcher, {
    dedupingInterval: 2000, // 이 시간 범위내에 동일 키를 사용하는 요청 중복 제거
  });
  const [channelCollapse, setChannelCollapse] = useState(false);
  const [onlineList, setOnlineList] = useState<number[]>([]);

  useEffect(() => {
    // console.log('DMList: workspace 바꼈다', workspace);
    setOnlineList([]);
  }, [workspace]);

  useEffect(() => {
    socket?.on('onlineList', (data: number[]) => {
      setOnlineList(data);
    });
    console.log('socket on dm', socket?.hasListeners('dm'), socket);
    return () => {
      console.log('socket off dm', socket?.hasListeners('dm'));
      socket?.off('onlineList');
    };
  }, [socket]);

  if (userData === undefined) {
    return <div>...로딩중</div>
  }

  if (!userData) {
    return <Navigate to="/login"/>
  }

  return (
    <ChattingWrap>
      <MemberList/>
      <ChattingBox/>
    </ChattingWrap>
  )
}
export default ChattingComponent;