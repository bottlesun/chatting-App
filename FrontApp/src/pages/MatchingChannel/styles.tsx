import styled from '@emotion/styled';
import {hoverColor} from "@utils/commonStyles";


export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;


export const Title = styled.h1`
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
`;


export const MyProfile = styled.div`
  margin-bottom: 10px;
  display: flex;
  cursor: default;
  position: relative;
  
  & img{
    width: 25px;
    height: 25px;
  }
  
  & div{
    margin-left: 10px;
    line-height: 25px;
  }

  & span {
    font-weight: bold;
    font-size: 20px;
    transition: all 0.4s;
    cursor:pointer;
    

    :hover {
      color: ${hoverColor}
    }
  }
`