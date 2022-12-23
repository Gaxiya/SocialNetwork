import React from 'react'
import styled from 'styled-components'

const StyledDialogButton = styled.button`` 

const DialogModalWindow = ({edit,copy,del,active}) => {
  return (
    <>
    <StyledDialogButton disabled={active.edit}>Edit</StyledDialogButton>
    <StyledDialogButton disabled={active.copy}>Copy text</StyledDialogButton>
    <StyledDialogButton >Delete</StyledDialogButton>
    </>
  )
}
export default DialogModalWindow
