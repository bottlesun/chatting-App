import styled from '@emotion/styled';
import {mainColor, boxShadow, hoverColor} from '@utils/commonStyles'


export const CreateModal = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  left: 0;
  top: 40px;

  z-index: 1022;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    display: inline-block;
    width: 100%;
    background: white;
    --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
    box-shadow: 0 0 0 1px var(--saf-0), 0 4px 12px 0 rgba(0, 0, 0, 0.12);
    background-color: rgba(var(--sk_foreground_min_solid, 248, 248, 248), 1);
    border-radius: 6px;
    user-select: none;
    max-width: 200px;
    padding: 10px 0 0;
    z-index: 1012;
    position: relative;
    
  }
`;

export const ModalButtons = styled.button`
  background: ${mainColor};
  border: none;
  padding: 8px;
  width: 100%;
  margin-top: 10px;
  font-weight: 500;
  border-radius: 0 0 6px 6px;
  cursor: pointer;
  transition: all 0.4s;
  
  :hover {
    background: ${hoverColor};
  }
`

export const MyInfo = styled.div`
  width: 100%;

  strong {
    margin-left: 10px;
    font-weight: bold;
  }
`
