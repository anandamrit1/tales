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

pub fun main(findName: String) : Address? {
    let resolveAddress: Address? = FIND.resolve(findName) 
    return resolveAddress
}