import create from 'zustand'
import {DMdataInterface} from "@typings/DMdata.interface"

export const DMdataStore = create<DMdataInterface>((set) => ({
  chatData: "",
  setChatData: (chatData : string) => set({chatData: chatData})
}))