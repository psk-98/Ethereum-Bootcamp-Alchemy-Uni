import { Alchemy, Network } from "alchemy-sdk"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "../../../styles/Transaction.module.css"

const alchemy = new Alchemy({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
})
export default function Transaction() {
  const [transaction, setTransaction] = useState()

  const router = useRouter()

  const { hash } = router.query

  const getTransactionDetails = async () => {
    setTransaction(await alchemy.core.getTransactionReceipt(hash))
  }

  useEffect(() => {
    if (hash) getTransactionDetails()
  }, [hash])

  return (
    <>
      {console.log(transaction)}
      <div className={styles.header}>Transaction details</div>
      <div className={styles.content}>
        <div className={styles.detail}>
          Transaction hash: {transaction?.transactionHash}
        </div>
        <div className={styles.detail}>
          Status: {transaction?.status === 1 ? "Success" : "Fail"}
        </div>
        <div className={styles.detail}>
          Block: {` ${transaction?.blockNumber}`}
        </div>
        {transaction?.contractAddress && (
          <div className={styles.detail}>
            Contract address: {` ${transaction?.contractAddress}`}
          </div>
        )}
        <div className={styles.detail}>
          From:{" "}
          <Link href={`wallet/${transaction?.from}`}>
            {` ${transaction?.from}`}
          </Link>
        </div>
        <div className={styles.detail}>
          To:{" "}
          <Link href={`wallet/${transaction?.to}`}>
            {" "}
            {` ${transaction?.to}`}
          </Link>
        </div>
      </div>
    </>
  )
}
