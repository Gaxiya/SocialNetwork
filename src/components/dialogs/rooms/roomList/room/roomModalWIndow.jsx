import React from 'react'
import styled from 'styled-components'

const StyledRoomButton = styled.button`
padding: 0;
background-color: unset;
border: none;
border-bottom: 1px solid #406b53;
color:rgb(255 255 255);
font-family: Lato;
font-size:14px;
&:hover {
    border-bottom: 2px solid #406b53;
}

` 
const RoomModalWindow = ({rename,leave,children}) => {
  return (
    <>
    {children}
    <StyledRoomButton 
    onClick={()=>{rename(true)}}
    >
        Rename room
    </StyledRoomButton>
    <StyledRoomButton 
    onClick={()=>{leave()}}
    >
        Leave room
    </StyledRoomButton>
    
    </>
  )
}
export default RoomModalWindow
