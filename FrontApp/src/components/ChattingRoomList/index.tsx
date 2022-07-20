import React from "react";
import {Link, Route} from "react-router-dom"
import {useParams} from "react-router";
const ChattingRoomList = ({...channels}) => {
    console.log(channels?.Members.length)
  return (
    <tr>
      <td>{channels.id}</td>
      <td>{channels.name}</td>
      <td><Link to={`sleact/channels/${channels.name}`}>Go! </Link></td>
    </tr>
  )
}

export default ChattingRoomList