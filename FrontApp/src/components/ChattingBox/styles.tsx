import styled from '@emotion/styled';
import {mainColor, boxShadow, hoverColor} from '@utils/commonStyles'


export const ChatPageContainer = styled.div`
  max-width: 450px;
  min-width: 350px;
  height: 530px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  box-shadow: ${boxShadow};
  position: relative;

`;

export const ChatHeader = styled.div`
  background-color: ${mainColor};
  padding: 10px;
  width: 100%;
  height: 45px;
  box-shadow: ${boxShadow};
  display: flex;
  justify-content: space-around;
  align-items: center;


  img {
    width: 25px;
    border-radius: 20px;
    margin-right: 10px;
  }

  h3 {
    margin: 0;

    span {
      font-weight: bold;
    }
  }

  a {
    width: 20px;
    height: 20px;

    & svg {
      width: 20px;
      height: 20px;
    }
  }

`
