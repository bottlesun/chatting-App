import styled from '@emotion/styled';
import {mainColor, boxShadow, hoverColor} from '@utils/commonStyles'


export const Button = styled.button`

    width: 70px;
    height: 35px;
    margin-left: 5px;
    font-weight: bold;
    background-color: ${mainColor};
    border: none;
    border-radius: 8px;
    box-shadow: ${boxShadow};
    transition: all 0.5s;
    cursor:pointer;

    :hover {
      background-color: ${hoverColor};
    }
`