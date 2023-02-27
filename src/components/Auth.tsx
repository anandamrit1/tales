import useCurrentUser from 'hooks/useCurrentUser'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Auth({children}: {children: React.ReactNode}) {
  const user = useCurrentUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?.loggedIn) {
      navigate('/')
    }
  }, [user])
  
  return (
    <>
      {children}
    </>
  )
}

export default Auth
