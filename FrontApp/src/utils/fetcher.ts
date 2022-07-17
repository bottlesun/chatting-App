import axios from 'axios';

const fetcher = (url: string) => axios.get(url, {
  withCredentials: true
})
  .then((response) => response.data); // url = 매개변수로 받아온다, 해당 값에서 [data] 를 돌려준다.

export default fetcher;