import React, {FC, useCallback} from "react";
import {ChattingModal, ModalButtons, ModalInput} from "@components/Modal/styles";
import {Input, Label} from '@pages/SignUp/styles';
import useSWR from "swr";
import {IChannel, IUser} from "@typings/db";
import fetcher from "@utils/fetcher";
import {useParams} from "react-router";
import useInput from "@hooks/useInput";
import axios from "axios";

interface Prop {
  showModal: boolean;
  setShowModal: (show: boolean) => void
}

const InviteChannelModal: FC<Prop> = ({showModal, setShowModal}) => {
  const {channel} = useParams<{ channel: string }>();
  const [newMember, onChangeNewMember, setNewMember] = useInput('');

  const {data: userData, mutate} = useSWR('/api/users', fetcher, {
    dedupingInterval: 2000, // 이 시간 범위내에 동일 키를 사용하는 요청 중복 제거
  });
  const {data:member,mutate: revalidateMembers} = useSWR<IUser[]>(
    userData ? `/api/workspaces/sleact/channels/${channel}/members` : null,
    fetcher,
  );

  console.log(member);

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }, [])

  const onInviteMember = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!newMember || !newMember.trim()) {
        return;
      }
      axios
        .post(`/api/workspaces/sleact/channels/${channel}/members`, {
          email: newMember,
        })
        .then(() => {
          revalidateMembers();
          setShowModal(false);
          setNewMember('');
        })
        .catch((error) => {
          console.dir(error);
        });
    },
    [channel, newMember, revalidateMembers, setNewMember,setShowModal],
  );

  return (
    <ChattingModal onClick={stopPropagation}>
      <div>
        <form onSubmit={onInviteMember}>
          <Label id="member-label">
            <span>채널 멤버 초대</span>
            <ModalInput id="member" value={newMember} onChange={onChangeNewMember} placeholder="이메일을 입력해주세요"/>
          </Label>
          <ModalButtons type="submit">초대하기</ModalButtons>

        </form>

      </div>
    </ChattingModal>
  )
}
export default InviteChannelModal