import styled from '@emotion/styled';

export const mainColor = "#FFEFBA";

export const MainBg = styled.div`
  width:100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${mainColor};  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #FFFFFF, ${mainColor});  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #FFFFFF, ${mainColor}); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: #333;
`;
