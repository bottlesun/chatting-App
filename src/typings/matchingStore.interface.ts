export interface MatchingStoreInterface {
  login: boolean
  nickName: string,
  toggleLogin: (login: boolean) => void;
  setNickName: (nickName: string | undefined) => void;
}
