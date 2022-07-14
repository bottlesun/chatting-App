import create from 'zustand'
import {MatchingStoreInterface} from "@typings/matchingStore.interface";

export const matchingStore = create<MatchingStoreInterface>((set) => ({
  login: false,
  nickName: "",
  toggleLogin: (login) => set({login: login}),
  setNickName: (nickName = undefined) => set({nickName: nickName})
}))