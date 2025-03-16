'use client'

import { getNextjstailwindanchorProgram, getNextjstailwindanchorProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useNextjstailwindanchorProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getNextjstailwindanchorProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getNextjstailwindanchorProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['nextjstailwindanchor', 'all', { cluster }],
    queryFn: () => program.account.nextjstailwindanchor.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['nextjstailwindanchor', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ nextjstailwindanchor: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useNextjstailwindanchorProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useNextjstailwindanchorProgram()

  const accountQuery = useQuery({
    queryKey: ['nextjstailwindanchor', 'fetch', { cluster, account }],
    queryFn: () => program.account.nextjstailwindanchor.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['nextjstailwindanchor', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ nextjstailwindanchor: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['nextjstailwindanchor', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ nextjstailwindanchor: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['nextjstailwindanchor', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ nextjstailwindanchor: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['nextjstailwindanchor', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ nextjstailwindanchor: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
