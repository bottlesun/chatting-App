import styled from '@emotion/styled';
import {mainColor, boxShadow, hoverColor} from '@utils/commonStyles'
import {MentionsInput} from 'react-mentions';

export const DM = styled.div`
  width: 95%;
  margin-top: 5px;

`

export const Form = styled.form`
  width: 100%;
  display: flex;
`

export const TextArea = styled(MentionsInput)`
  width: 100%;
  max-height: 150px;
  resize: none;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  padding: 5px;


  & :focus {
    border: none;
    outline: none;
  }
  & strong {
    background: skyblue;
    padding: 5px;
    color: transparent;
  }
  & textarea {
    height: 44px;
    padding: 9px 10px !important;
    outline: none !important;
    border-radius: 4px !important;
    resize: none !important;
    line-height: 22px;
    border: none;
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
  margin-top: 10px;

  :hover {
    background-color: ${hoverColor};
`

export const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
`

export const EachMention = styled.button<{ focus: boolean }>`
  padding: 4px 20px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  color: rgb(28, 29, 28);
  width: 100%;
  & img {
    margin-right: 5px;
  }
  
  ${({focus}) =>
          focus &&
          `
    background: #1264a3;
    color: white;
  `};
`;