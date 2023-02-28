//import FlowMeiumContract from 0xee837a2c3d2e13a4
import FlowMeiumContract from 0x909fa9dc860f58fc
import FungibleToken from 0x9a0766d93b6608b7
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetadataViews from 0x631e88ae7f1d7c20
import FIND from 0x35717efbbce11c74
import Dandy from 0x35717efbbce11c74
import Profile from 0x35717efbbce11c74
import FindMarket from 0x35717efbbce11c74
import FindMarketDirectOfferSoft from 0x35717efbbce11c74
import DapperUtilityCoin from 0x82ec283f88a62e65
import FlowUtilityToken from 0x82ec283f88a62e65 
import FindLeaseMarketDirectOfferSoft from 0x35717efbbce11c74
import FindLeaseMarket from 0x35717efbbce11c74

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