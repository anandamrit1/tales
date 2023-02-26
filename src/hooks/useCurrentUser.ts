// @ts-ignore
import * as fcl from '@onflow/fcl'
import { useEffect, useState } from 'react'
import { atom, useRecoilState } from 'recoil';

const userState = atom<any>({
  key: 'userState',
  default: {loggedIn: null},
});

export default function useCurrentUser() {
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    fcl.currentUser.subscribe(setUser)
  }, [])

  return user
}