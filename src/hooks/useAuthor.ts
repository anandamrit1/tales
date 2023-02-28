import { useCallback, useEffect, useMemo, useState } from "react";
// @ts-ignore
import * as fcl from '@onflow/fcl'
// @ts-ignore
import GetFindProfile from '../cadence/scripts/GetFindProfile.cdc'
// @ts-ignore
import GetAddressFromFindName from '../cadence/scripts/GetAddressFromFindName.cdc'
import { defaultAuthor, demoAuthor } from "utils/constants";
import { Author } from "types/types";

export type useAuthorType = {
    author: Author
    isAuthorLoading: boolean
}

export const useAuthor = (address: string): useAuthorType => {
    const [currAuthor, setCurrAuthor] = useState<any>()
    const [isAuthorLoading, setIsAuthorLoading] = useState<boolean>(true)

    const getProfile = useCallback(async () => {
        const tempAuthor = defaultAuthor
        setIsAuthorLoading(true)
        var res, addressToSearch = address;
        try {
            if (address.endsWith(".find")) {
                addressToSearch = address.replace(".find", "")
                res = await fcl.query({
                    cadence: GetAddressFromFindName,
                    args: (arg: any, t: any):any => [arg(addressToSearch, t.String)]
                })
                addressToSearch = res
                console.log("Address : ", res)
            }
            if (addressToSearch === "") {
                setCurrAuthor(tempAuthor)
                setIsAuthorLoading(false)
                return
            }

            res = await fcl.query({
                cadence: GetFindProfile,
                args: (arg: any, t: any):any => [arg(addressToSearch, t.Address)]
            })
            console.log("Profile : ", res)
        } catch(e) {
            console.log("Profile Error: ", e)
        } finally {
            setIsAuthorLoading(false)
        }

        tempAuthor.name = res?.name
        tempAuthor.findName = res?.findName ?? tempAuthor.findName
        tempAuthor.description = res?.description ?? tempAuthor.description
        tempAuthor.img = res?.avatar
        tempAuthor.address = res?.address
        
        setCurrAuthor(tempAuthor)
    }, [address])

    // useEffect(() => {
    //     if (address) getProfile()
    // }, [address])

    return { author: demoAuthor, isAuthorLoading: false}
}