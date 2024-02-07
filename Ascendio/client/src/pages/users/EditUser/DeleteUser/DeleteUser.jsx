import React, { useState } from 'react'
import { VerifyPasswordDelete } from './VerifyPasswordDelete/VerifyPasswordDelete'
import { ConfirmDeleteUser } from './ConfirmDeleteUser/ConfirmDeleteUser'

export const DeleteUser = ({user, setUser, setShowDeleteUser}) => {
  const [showVerifyPasswordDelete, setShowVerifyPasswordDelete] = useState(true)
  const [showConfirmDeleteUser, setShowConfirmDeleteUser] = useState(false)
  return (
    <>
    {showVerifyPasswordDelete && < VerifyPasswordDelete
    setShowDeleteUser = {setShowDeleteUser}
    setShowVerifyPasswordDelete = {setShowVerifyPasswordDelete}
    setShowConfirmDeleteUser = {setShowConfirmDeleteUser}

    
    />}
    {showConfirmDeleteUser && <ConfirmDeleteUser
    setShowDeleteUser = {setShowDeleteUser} 
    user={user}   
    />}
    
    </>
  )
}
