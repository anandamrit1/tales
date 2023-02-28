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

pub fun main(address: Address) : Profile.UserReport? {
	let account = getAccount(address)
    log("Balance ".concat(account.balance.toString()))
	if account.balance == 0.0 {
        log("Zero balance profile return")
		return nil
	}

	var profileReport = account
		.getCapability<&{Profile.Public}>(Profile.publicPath)
		.borrow()?.asReport()

	if profileReport != nil && profileReport!.findName != FIND.reverseLookup(address) {
		profileReport = Profile.UserReport(
			findName: "",
			address: profileReport!.address,
			name: profileReport!.name,
			gender: profileReport!.gender,
			description: profileReport!.description,
			tags: profileReport!.tags,
			avatar: profileReport!.avatar,
			links: profileReport!.links,
			wallets: profileReport!.wallets, 
			following: profileReport!.following,
			followers: profileReport!.followers,
			allowStoringFollowers: profileReport!.allowStoringFollowers,
			createdAt: profileReport!.createdAt
		)
	}

	return profileReport
}
 