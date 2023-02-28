import FlowMeiumContract from 0x909fa9dc860f58fc

pub struct ClaimedPosts {
    pub let id: UInt64
    pub let serial: UInt64
    pub let author: Address
    pub let postId: UInt64
    pub let postPrice: UFix64
    pub let postTitle: String
    pub let postImage: String
    pub let postCreateDate: UFix64
    pub let dateReceived: UFix64

    init(id: UInt64, serial: UInt64, author: Address, postId: UInt64, postPrice: UFix64, postTitle: String, postImage: String, postCreateDate: UFix64, dateReceived: UFix64) {
        self.id = id
        self.serial = serial
        self.author = author
        self.postId = postId
        self.postPrice = postPrice
        self.postTitle = postTitle
        self.postImage = postImage
        self.postCreateDate = postCreateDate
        self.dateReceived = dateReceived
    }
}

pub fun main(address: Address): [ClaimedPosts] {
    // Get the public account object for account
    let posts: [ClaimedPosts] = []

    let acct = getAccount(address)
    let capability = acct.getCapability<&{FlowMeiumContract.CollectionPublic}>(FlowMeiumContract.CollectionPublicPath)
    let publicRef = capability.borrow()
    if publicRef == nil { return posts }
    let claimedPostIDs = publicRef!.getIDs()

    
    for postID in claimedPostIDs {
        let nft = publicRef!.borrowFlowMeium(id: postID)
        if nft != nil {
            let p = ClaimedPosts(
                id: nft!.id,
                serial: nft!.serial,
                author: nft!.author,
                postId: nft!.postId,
                postPrice: nft!.postPrice,
                postTitle: nft!.postTitle,
                postImage: nft!.postImage,
                postCreateDate: nft!.postCreateDate,
                dateReceived: nft!.dateReceived
            )
            posts.append(p)
        }
    }

    return posts
}