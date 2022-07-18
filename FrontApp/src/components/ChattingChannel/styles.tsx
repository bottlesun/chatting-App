import styled from '@emotion/styled';
import {mainColor, boxShadow, hoverColor} from '@utils/commonStyles'


export const ChattingChannelContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 500px;
  min-width: 320px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  border-radius: 10px;
  padding: 20px;

  table {
    border-collapse: collapse;
    width: 100%;
    height: 100%;
  }

  td, th {
    width: 15%;
    height: 100%;
    border: 1px solid #eaeaea;
    padding: 5px;
    text-align: center;
    transition: all 0.4s;
    font-size: 12px;

    :nth-of-type(1) {
      border-left: 1px solid #fff;
    }

    :nth-of-type(2) {
      width: 70%;
    }

    :nth-of-type(3) {
      border-right: 1px solid #fff;
    }
  }

  thead {
    background: ${mainColor};

    th {
      font-weight: 600;
      border: 1px solid #fff;
    }
  }

  tbody {
    & tr {
      cursor: pointer;

      :hover {
        background: rgba(0, 0, 0, 0.01);
      }
    }

    & td {
      :nth-of-type(3) {
        :hover {
          background: ${mainColor};
          font-weight: bold;
        }
      }
    }
  }


`;


