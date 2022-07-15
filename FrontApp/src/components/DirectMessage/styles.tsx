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
