import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import React, {useEffect, FC, useCallback} from 'react';
import { useParams } from 'react-router';
import { NavLink, useLocation } from 'react-router-dom';
import useSWR from 'swr';

interface Props {
  member: IUser;
  isOnline: boolean;
}

const MemberList : FC<Props> = ({member,isOnline}) => {
  const { workspace } = useParams<{ workspace?: string }>();
  const location = useLocation();
  const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
    dedupingInterval: 2000, // 2초
  });
  const date = localStorage.getItem(`${workspace}-${member.id}`) || 0;
  const { data: count, mutate } = useSWR<number>(
    userData ? `/api/workspaces/${workspace}/dms/${member.id}/unreads?after=${date}` : null,
    fetcher,
  );

  const ClassAction = useCallback(() => {

  },[])

  useEffect(() => {
    if (location.pathname === `/workspace/${workspace}/dm/${member.id}`) {
      mutate(0);
    }
  }, [mutate, location.pathname, workspace, member]);

  return (
      <div><span className={isOnline ? 'selected' : ""}></span>{member.nickname}</div>
  )
}

export default MemberList