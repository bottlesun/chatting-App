import styled from '@emotion/styled';
import {mainColor, boxShadow, hoverColor} from '@utils/commonStyles'
import {MentionsInput} from 'react-mentions';

export const DM = styled.div`
  width: 95%;
  height: 80px;
`

export const Form = styled.form`
  display: flex;
  width: 100%;
`

export const TextArea = styled.textarea`
  width: 100%;
  height: 75px;
  resize: none;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  padding: 5px;

  :focus, :hover {
    outline: none;
  }


`
export const InviteBtn = styled.div`
  width: 70px;
  height: 30px;
  margin-left: 5px;
  font-weight: bold;
  background-color: ${mainColor};
  border: none;
  border-radius: 8px;
  box-shadow: ${boxShadow};
  transition: all 0.5s;
  cursor: pointer;
  font-size: 13px;
  text-align: center;
  line-height: 30px;
  margin-top:10px;

  :hover {
    background-color: ${hoverColor};
`

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;

`
