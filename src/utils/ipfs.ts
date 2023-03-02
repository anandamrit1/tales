//https://tales.infura-ipfs.io/ipfs/QmedpPDPhYpBTYgRMTeVSZeaPWaCHpTU7YR1CSP8VC4SxH
//https://ipfs.io/ipfs/QmedpPDPhYpBTYgRMTeVSZeaPWaCHpTU7YR1CSP8VC4SxH

export const getIpfsURL = (url : string | undefined) => {
    if(!url) return url
    return url.replace("ipfs.io", "nftstorage.link")
    //return url.replace("ipfs.io", "tales.infura-ipfs.io")
}