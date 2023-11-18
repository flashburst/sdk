import { type Signer } from '@ethersproject/abstract-signer'
import { type Contract } from '@ethersproject/contracts'
import { type Provider } from '@ethersproject/providers'

import * as abis from '../config/abis/index.js'
import { type ChainId } from '../types/index.js'
import * as contract from '../utils/contract.js'
import * as keyUtil from '../utils/key-util.js'
import { getOrFetch } from './CachedStoreAddress.js'

const getAddress = async (chainId: ChainId, coverKey: string, signerOrProvider: Provider | Signer): Promise<string> => {
  const key = keyUtil.encodeKeys(['bytes32', 'bytes32', 'bytes32'], [keyUtil.PROTOCOL.NS.CONTRACTS, keyUtil.PROTOCOL.CNS.COVER_VAULT, coverKey])

  // eslint-disable-next-line @typescript-eslint/return-await
  return getOrFetch(chainId, key, signerOrProvider)
}

const getInstance = async (chainId: ChainId, coverKey: string, signerOrProvider: Provider | Signer): Promise<Contract> => {
  const address = await getAddress(chainId, coverKey, signerOrProvider)
  return contract.getContract(address, abis.IVault, signerOrProvider)
}

const getInstanceByAddress = async (address: string, signerOrProvider: Provider | Signer): Promise<Contract> => {
  return contract.getContract(address, abis.IVault, signerOrProvider)
}

export { getAddress, getInstance, getInstanceByAddress }
