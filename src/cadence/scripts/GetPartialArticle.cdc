import FlowMeiumContract from 0xf8d6e0586b0a20c7

pub struct PostMetadata {
    pub let id: String
    pub let title: String
    pub let description: String
    pub let author: String
    pub let image: String
    pub let price: String
    pub let data: String
    pub let createDate: String
    pub let metadata: {String: String}

    init(_id: UInt64, _title: String, _description: String, _author:Address, _image: String, _price: UFix64, _data: String, _createDate: UFix64,_metadata: {String: String}) {
        self.id = _id.toString()
        self.title = _title
        self.description = _description
        self.author = _author.toString()
        self.image = _image
        self.price = _price.toString()
        self.metadata = _metadata
        self.createDate = _createDate.toString()
        self.data = _data
    }
}

// Get tweets owned by an account
pub fun main(authorAddress: Address, postID: UInt64): PostMetadata? {
    // Get the account object for the author
    

    // Get the public account object for account
    let acct = getAccount(authorAddress)
    
    // Find the public capability for their Collection
    let capability = acct.getCapability<&{FlowMeiumContract.PostCollectionPublic}>(FlowMeiumContract.PostCollectionPublicPath)

    // borrow a reference from the capability
    let publicRef = capability.borrow()

    if(publicRef == nil) { return nil }

    let post = publicRef!.getPostData(postID: postID)
    
    if(post == nil) { return nil }
    
    let metadata = PostMetadata(_id: post.id, _title: post.title, _description: post.description, 
                                    _author: post.author, _image: post.image, _price: post.price, _data: post.data,
                                    _createDate: post.createDate, _metadata: post.metadata)
  
    return post
}