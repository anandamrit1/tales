// @ts-ignore
import { config } from '@onflow/fcl'
import { ACCESS_NODE_URLS } from '../utils/constants'
import flowJSON from './flow.json'

const flowNetwork = process.env.NEXT_PUBLIC_FLOW_NETWORK ?? "mainnet"

console.log('Dapp running on network:', flowNetwork)

const c = config({
  'flow.network': flowNetwork,
  'accessNode.api': ACCESS_NODE_URLS[flowNetwork],
  'discovery.wallet': `https://fcl-discovery.onflow.org/${flowNetwork}/authn`,
  'app.detail.icon': 'https://avatars.githubusercontent.com/u/50278?s=200&v=4',
  'app.detail.title': 'Chronicles'
}).load({ flowJSON })