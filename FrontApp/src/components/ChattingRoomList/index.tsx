import React from "react";
import {Link} from "react-router-dom"

const ChattingRoomList = ({...channel}) => {

  return (

    <tr>
      <td>{channel.id}</td>
      <td>{channel.name} ({channel?.Members.length})</td>
      <td><Link to='/matching/channels/:channel/chat'>Go! </Link></td>
    </tr>
  )
}

export default ChattingRoomList