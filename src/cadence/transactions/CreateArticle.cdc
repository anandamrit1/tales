//import FlowMeiumContract from 0xee837a2c3d2e13a4
import FlowMeiumContract from 0xf8d6e0586b0a20c7
import FlowToken from 0x0ae53cb6e3f42a79
import FungibleToken from 0xee82856bf20e2aa6

// This transaction creates a new post with an argument
transaction (_title: String, _description: String, _image: String, _price:UFix64, _data: String) {
    // Let's check that the account has a collection
    prepare(acct: AuthAccount) {
        if acct.borrow<&FlowMeiumContract.PostCollection>(from: FlowMeiumContract.PostCollectionStoragePath) == nil {
            // vault capability
            let vaultRef = acct.getCapability<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
            
            // create empty post collection
            acct.save<@FlowMeiumContract.PostCollection>(<-FlowMeiumContract.createEmptyPostCollection(address: acct.address, receiver: vaultRef), 
                                                     to: FlowMeiumContract.PostCollectionStoragePath)

            // link
            acct.link<&{FlowMeiumContract.PostCollectionPublic}>(FlowMeiumContract.PostCollectionPublicPath, target: FlowMeiumContract.PostCollectionStoragePath)
        }

        // borrow the collection
        let collection = acct.borrow<&FlowMeiumContract.PostCollection>(from: FlowMeiumContract.PostCollectionStoragePath)

        // call the collection's saveTweet method and pass in a Tweet resource
        collection?.savePost(post: <-FlowMeiumContract.createPost(_title: _title, _description: _description, _author: acct.address, _image: _image, _price: _price, _data: _data, _metadata: {}))
        log("Post Created successfully")
    }
}