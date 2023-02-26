import FlowMeiumContract from 0xee837a2c3d2e13a4

// This transaction creates a new post with an argument
transaction (_title: String, _description: String, _image: String, _price:UFix64, _data: String) {
    // Let's check that the account has a collection
    prepare(acct: AuthAccount) {
        if acct.borrow<&FlowMeiumContract.Collection>(from: FlowMeiumContract.PostCollectionStoragePath) != nil {
            log("Collection exists!")
        } else {
            // let's create the collection if it doesn't exist
            acct.save<@FlowMeiumContract.Collection>(<-FlowMeiumContract.createEmptyCollection(address: acct.address), 
                                                     to: FlowMeiumContract.PostCollectionStoragePath)
            // publish a reference to the Collection in storage
            acct.link<&{FlowMeiumContract.CollectionPublic}>(FlowMeiumContract.PostCollectionPublicPath, target: FlowMeiumContract.PostCollectionStoragePath)
        }

        // borrow the collection
        let collection = acct.borrow<&FlowMeiumContract.Collection>(from: FlowMeiumContract.PostCollectionStoragePath)

        // call the collection's saveTweet method and pass in a Tweet resource
        collection?.savePost(post: <-FlowMeiumContract.createPost(_title: _title, _description: _description, _author: acct.address, _image: _image, _price: _price, _data: _data, _metadata: {}))
        log("Post Created successfully")
    }
}