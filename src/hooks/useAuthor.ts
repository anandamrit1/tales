import { useEffect, useMemo, useState } from "react";
// @ts-ignore
import * as fcl from '@onflow/fcl'
// @ts-ignore
import GetFindProfile from '../cadence/scripts/GetFindProfile.cdc'
import { defaultAuthor } from "utils/constants";
import { Author } from "types/types";

export const useAuthor = (address: string): Author => {
    const [currAuthor, setCurrAuthor] = useState<any>()

    useEffect(() => {
        const getProfile = async () => {
            const tempAuthor = defaultAuthor
            var res;
            try {
                res = await fcl.query({
                    cadence: GetFindProfile,
                    args: (arg: any, t: any):any => [arg(address, t.Address)]
                })
                console.log("Profile : ", res)
            } catch(e) {
                console.log("Profile Error: ", e)
            }
            tempAuthor.name = res?.name
            tempAuthor.findName = res?.findName ?? tempAuthor.findName
            tempAuthor.description = res?.description ?? tempAuthor.description
            tempAuthor.img = res?.avatar
            setCurrAuthor(tempAuthor)
        }
    
        getProfile()
    }, [address])

    return currAuthor
}