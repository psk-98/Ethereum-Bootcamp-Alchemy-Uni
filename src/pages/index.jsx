import { Alchemy, Network } from "alchemy-sdk"
import Link from "next/link"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"

const alchemy = new Alchemy({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
})

export default function Home() {
  const [blockNumber, setBlockNumber] = useState()

  const [transactions, setTransactions] = useState()

  const getBlockNumber = async () => {
    setBlockNumber(await alchemy.core.getBlockNumber())
  }

  const getTransactions = async () => {
    setTransactions(await alchemy.core.getBlockWithTransactions(blockNumber))
  }
  useEffect(() => {
    getBlockNumber()
  }, [])

  useEffect(() => {
    blockNumber && getTransactions()
  }, [blockNumber])

  return (
    <>
      <div className={styles.latestBlock}>
        Latest Block Number: {blockNumber}{" "}
      </div>
      <div className={styles.header}>{"Block's transactions"}</div>
      <div className={styles.transactions}>
        {transactions?.transactions.slice(0, 8).map((transaction, i) => {
          return (
            <div className={styles.transactionWrapper} key={i}>
              <Link
                href={`transaction/${transaction.hash}`}
                className={styles.transaction}
              >
                <div>T# {transaction.hash.slice(0, 17)}...</div>
                <div>
                  From{" "}
                  <Link href={`wallet/${transaction.from}`}>
                    {`${transaction.from.slice(
                      0,
                      10
                    )}...${transaction.from.slice(-10)}`}
                  </Link>
                </div>
                <div>
                  To{" "}
                  <Link href={`wallet/${transaction.to}`}>
                    {`${transaction.to.slice(0, 10)}...${transaction.to.slice(
                      -10
                    )}`}
                  </Link>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}
