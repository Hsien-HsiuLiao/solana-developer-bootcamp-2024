import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair } from '@solana/web3.js'
import { Nextjstailwindanchor } from '../target/types/nextjstailwindanchor'

describe('nextjstailwindanchor', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Nextjstailwindanchor as Program<Nextjstailwindanchor>

  const nextjstailwindanchorKeypair = Keypair.generate()

  it('Initialize Nextjstailwindanchor', async () => {
    await program.methods
      .initialize()
      .accounts({
        nextjstailwindanchor: nextjstailwindanchorKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([nextjstailwindanchorKeypair])
      .rpc()

    const currentCount = await program.account.nextjstailwindanchor.fetch(nextjstailwindanchorKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Nextjstailwindanchor', async () => {
    await program.methods.increment().accounts({ nextjstailwindanchor: nextjstailwindanchorKeypair.publicKey }).rpc()

    const currentCount = await program.account.nextjstailwindanchor.fetch(nextjstailwindanchorKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Nextjstailwindanchor Again', async () => {
    await program.methods.increment().accounts({ nextjstailwindanchor: nextjstailwindanchorKeypair.publicKey }).rpc()

    const currentCount = await program.account.nextjstailwindanchor.fetch(nextjstailwindanchorKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Nextjstailwindanchor', async () => {
    await program.methods.decrement().accounts({ nextjstailwindanchor: nextjstailwindanchorKeypair.publicKey }).rpc()

    const currentCount = await program.account.nextjstailwindanchor.fetch(nextjstailwindanchorKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set nextjstailwindanchor value', async () => {
    await program.methods.set(42).accounts({ nextjstailwindanchor: nextjstailwindanchorKeypair.publicKey }).rpc()

    const currentCount = await program.account.nextjstailwindanchor.fetch(nextjstailwindanchorKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the nextjstailwindanchor account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        nextjstailwindanchor: nextjstailwindanchorKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.nextjstailwindanchor.fetchNullable(nextjstailwindanchorKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
