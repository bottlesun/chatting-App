import useInput from '@hooks/useInput';
import React, {FormEvent, useCallback, useState} from 'react';
import {Button, Error, Form, Header, Input, Label, LinkContainer} from '@pages/SignUp/styles';
import {Link, Navigate} from 'react-router-dom';
import axios from "axios";
import useSWR from "swr";
import fetcher from "@utils/fetcher";

const LogIn = () => {
  const {data , error , mutate} = useSWR('/api/users' ,fetcher , {
    dedupingInterval : 2000, // 이 시간 범위내에 동일 키를 사용하는 요청 중복 제거
  });
  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmit = useCallback(
    (e:FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLogInError(false);

      axios.post('/api/users/login',
        {email, password},{
        withCredentials: true // post 는 3번째 자리 , get 은 2번째 자리/ 서버끼리 도메인이 다르더라도, 서로간의 쿠키가 전달 될 수 있게해줌
        },)
        .then(() => {
          mutate()
        })
        .catch((error) => {
          console.log(error.response);
          setLogInError(true);
        })
    },
    [email, password],
  );

  return (
    <div id="container">
      <Header>Chatting App</Header>
      <Form onSubmit={onSubmit}>
        <Label id="email-label">
          <span>이메일 주소</span>
          <div>
            <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail}/>
          </div>
        </Label>
        <Label id="password-label">
          <span>비밀번호</span>
          <div>
            <Input type="password" id="password" name="password" value={password} onChange={onChangePassword}/>
          </div>
          {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        </Label>
        <Button type="submit">로그인</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  );
};

export default LogIn;