import styled from '@emotion/styled';
import {mainColor, boxShadow, hoverColor} from '@utils/commonStyles'


export const ChatPageContainer = styled.div`
  max-width: 450px;
  min-width: 350px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: ${boxShadow};

`;

export const ChatHeader = styled.div`
  background-color: ${mainColor};
  padding: 10px;
  width: 100%;
  height: 45px;
  box-shadow: ${boxShadow};
  display: flex;
  justify-content: center;
  overflow: hidden;

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
`
