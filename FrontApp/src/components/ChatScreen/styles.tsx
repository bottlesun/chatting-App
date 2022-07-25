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

export const Section = styled.section`
  margin-top: 20px;
  border-top: 1px solid #eee;
`;

export const StickyHeader = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  width: 100%;
  position: sticky;
  top: 20px;
  & button {
    font-weight: bold;
    font-size: 13px;
    height: 28px;
    line-height: 27px;
    padding: 0 16px;
    z-index: 2;
    --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
    box-shadow: 0 0 0 1px var(--saf-0), 0 1px 3px 0 rgba(0, 0, 0, 0.08);
    border-radius: 24px;
    position: relative;
    top: -13px;
    background: white;
    border: none;
    outline: none;
  }
`;

