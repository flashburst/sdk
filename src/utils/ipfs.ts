import { IPFSClient } from '../net/index.js'

const fallbackNodes = ['https://api.thegraph.com/ipfs']

const write = async (contents: Record<string, any>, nodeUrls?: string[]): Promise<string | undefined> => {
  const formatted = JSON.stringify(contents, null, 2)

  const nodes = typeof nodeUrls !== 'undefined' ? nodeUrls : fallbackNodes
  const client = new IPFSClient(nodes)

  const hash = await client.addString(formatted)

  if (hash === undefined) {
    return undefined
  }

  return hash
}

const read = async (key: string, nodeUrls?: string[]): Promise<Record<string, any> | undefined> => {
  const nodes = typeof nodeUrls !== 'undefined' ? nodeUrls : fallbackNodes
  const client = new IPFSClient(nodes)

  const raw = await client.getString(key)

  if (raw !== undefined) {
    return JSON.parse(raw)
  }

  return raw // which is undefined
}

export { read, write }
