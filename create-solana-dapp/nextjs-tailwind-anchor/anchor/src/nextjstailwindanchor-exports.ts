// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import NextjstailwindanchorIDL from '../target/idl/nextjstailwindanchor.json'
import type { Nextjstailwindanchor } from '../target/types/nextjstailwindanchor'

// Re-export the generated IDL and type
export { Nextjstailwindanchor, NextjstailwindanchorIDL }

// The programId is imported from the program IDL.
export const NEXTJSTAILWINDANCHOR_PROGRAM_ID = new PublicKey(NextjstailwindanchorIDL.address)

// This is a helper function to get the Nextjstailwindanchor Anchor program.
export function getNextjstailwindanchorProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...NextjstailwindanchorIDL, address: address ? address.toBase58() : NextjstailwindanchorIDL.address } as Nextjstailwindanchor, provider)
}

// This is a helper function to get the program ID for the Nextjstailwindanchor program depending on the cluster.
export function getNextjstailwindanchorProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Nextjstailwindanchor program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return NEXTJSTAILWINDANCHOR_PROGRAM_ID
  }
}
