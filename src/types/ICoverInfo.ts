import { ChainId } from './ChainId'

interface ICoverInfo {
  key: string
  coverName: string
  projectName?: string
  vault: {
    name: string
    symbol: string
  }
  requiresWhitelist: boolean
  supportsProducts: boolean
  leverage: string
  tags: string[]
  about: string
  blockchains?: Array<{
    chainId?: number
    name: string
  }>
  rules: string
  exclusions: string
  links?: {
    website: string
    documentation?: string
    telegram?: string
    twitter?: string
    github?: string
    facebook?: string
    blog?: string
    discord?: string
    linkedin?: string
    slack?: string
  }
  pricingFloor: string
  pricingCeiling: string
  reportingPeriod: number
  cooldownPeriod: number
  claimPeriod: number
  minReportingStake: string
  resolutionSources: string[]
  stakeWithFees: string
  reassurance: string
  reassuranceRate: string
  stakingPool?: {
    name: string
    settings: {
      [key in ChainId]?: {
        rewardToken: { symbol: string }
        uniRewardTokenDollarPair: { token: string }
        stakingTarget: string
        maxStake: string
        rewardPerBlock: string
        lockupPeriodInBlocks: string
        rewardTokenDeposit: string
      }
    }
  }
}

export { ICoverInfo }
