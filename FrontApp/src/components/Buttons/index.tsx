import React from "react";
import {Button} from "@components/Buttons/styles";

export interface ButtonInterface {
  disabled: boolean | undefined,
  children: string,
}

const Buttons = ({disabled, children }: ButtonInterface) => {
  return <Button disabled={disabled} >{children}</Button>

}

export default Buttons