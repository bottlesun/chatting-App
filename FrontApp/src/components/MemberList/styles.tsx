import styled from '@emotion/styled';
import {mainColor, boxShadow, hoverColor} from '@utils/commonStyles'


export const MemberListWrap = styled.div`
  width: 150px;
  height: 525px;
  background: ${mainColor};
  box-shadow: ${boxShadow};
  margin-right: 10px;
  border-radius: 5px;
  padding: 5px;

  ul {
    height: 100%;
    padding: 10px;
    margin: 0;
    background: #fff;
    box-shadow: ${boxShadow};
    display: flex;
    flex-direction: column;

    li {
      font-size: 13px;
      width: 100%;
      clear: both;
      line-height: 15px;
      height: 15px;
      margin: 5px;

      span {
        width: 10px;
        height: 10px;
        border:2px solid #999;
        border-radius: 5px;
        display: block;
        float: left;
        margin-right: 5px;
        margin-top: 2px;
      }
      span.active{
        background:darkgreen;
        border:2px solid darkgreen;
      }
    }
  }
`


