import styled from '@emotion/styled';
import {mainColor, boxShadow, hoverColor} from '@utils/commonStyles'

export const BubbleContainer = styled.div`
  max-width: 40%;
  padding: 5px;
  border-radius: 20px;
  text-align: center;
  box-shadow: ${boxShadow};
  background: ${mainColor};
`