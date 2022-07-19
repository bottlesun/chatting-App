import React from "react";
import {Button} from "@components/Buttons/styles";

export interface ButtonInterface {
  disabled: boolean | undefined,
  children: string,
  type : "button" | "submit" | "reset" | undefined
}

const Buttons = ({disabled, children,type }: ButtonInterface) => {
  return <Button type={type} disabled={disabled} >{children}</Button>

}

export default Buttons