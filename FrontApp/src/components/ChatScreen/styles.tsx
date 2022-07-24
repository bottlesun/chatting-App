import styled from '@emotion/styled';
import {mainColor, boxShadow, hoverColor} from '@utils/commonStyles'

export const Screen = styled.div`
  height: 400px;
  width: 100%;
  padding: 20px;
  
`

export const BubbleContainer = styled.section`
  display: flex;
  max-width: 50%;
  text-align: center;
  align-items: flex-start;
  margin-bottom: 10px;
  flex-direction: column;
  
  
  .nickNamesWrap{
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    
    img{
      border-radius: 30px;
      margin-right: 5px;
    }
    .nickNames{
      font-size: 8px;
      font-weight: bold;
    }    
  }

  .bubble{
    box-shadow: ${boxShadow};
    background: ${mainColor};
    padding: 5px 10px;
    border-radius: 30px;
    min-width: 80px;
    font-size: 13px;

  }

`

