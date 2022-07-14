import styled from '@emotion/styled';
import {mainColor, boxShadow, hoverColor} from '@utils/commonStyles'


export const MatchingContainer = styled.div`
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

  h3 {
    font-size: 15px;
    font-weight: 500;
  }
`;

export const Form = styled.form`
  display: flex;
  justify-content: space-evenly;

  input {
    width: 250px;
    height: 35px;
    border-radius: 8px;
    border: 1px solid #eaeaea;
    box-shadow: ${boxShadow};
    padding: 3px 15px;

    :focus, :hover {
      outline: none;
    }
    
  }
`
