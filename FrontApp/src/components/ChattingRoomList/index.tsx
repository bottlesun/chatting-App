import React from "react";
import {Link} from "react-router-dom"
import {useParams} from "react-router";

const ChattingRoomList = ({...channels}) => {
  const {workspace} = useParams<{ workspace: string }>();
  return (
    <tr>
      <td>{channels.id}</td>
      <td>{channels.name}</td>
      <td><Link to={`/workspace/${workspace}/channels/${channels.name}`}>Go! </Link></td>
    </tr>
  )
}

export default ChattingRoomList