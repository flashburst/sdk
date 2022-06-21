import { keccak256 as solidityKeccak256 } from '@ethersproject/solidity'
import { ICacheProvider } from '../types/ICacheProvider'
import { BrowserCacheProvider } from './browser-cache-provider'
import { localStorageAvailable } from '../utils/local-storage'
import { getStoreAddressFromEnvironment } from '../config/store'
import { ChainId } from '../types/ChainId'

const getProvider = (): ICacheProvider|null => {
  if (localStorageAvailable()) {
    return new BrowserCacheProvider()
  }

  return null
}

const genKey = (chainId: ChainId, nsKey: string): string => {
  const store = getStoreAddressFromEnvironment(chainId)
  return solidityKeccak256(['uint256', 'address', 'bytes32'], [chainId.toString(), store, nsKey])
}

const get = (key: string): string | null => {
  const provider = getProvider()

  if (provider != null) {
    return provider.get(key)
  }

  return null
}

const set = (key: string, value: string): void => {
  const provider = getProvider()

  if (provider != null) {
    provider.set(key, value)
  }
}

const remove = (key: string): void => {
  const provider = getProvider()

  if (provider != null) {
    provider.remove(key)
  }
}

export {
  genKey,
  get,
  set,
  remove
}
