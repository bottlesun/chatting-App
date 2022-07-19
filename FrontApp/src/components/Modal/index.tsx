import React, {useCallback, FC} from "react";
import {CreateModal, ModalButtons, MyInfo} from "@components/Modal/styles";
import {ModalInterface} from "@typings/Modal.interface";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import gravatar from "gravatar";

const Modal: FC<ModalInterface> = ({onLogout, style}) => {
  const {data} = useSWR('/api/users', fetcher, {
    dedupingInterval: 2000, // 이 시간 범위내에 동일 키를 사용하는 요청 중복 제거
  });

  const imgUrl = gravatar.url(data?.id, {s: '25', r: 'x', d: 'retro'}, true);

  const stopPropagation = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log('stopPropagation');
  }, [])



  return (
    <CreateModal style={style}>
      <div onClick={stopPropagation}>
        <MyInfo>
          <img src={imgUrl} alt={data?.nickname}/>
          <strong>{data?.nickname} </strong>
        </MyInfo>
        <ModalButtons onClick={onLogout}>로그아웃</ModalButtons>
      </div>
    </CreateModal>
  )
}

export default Modal;