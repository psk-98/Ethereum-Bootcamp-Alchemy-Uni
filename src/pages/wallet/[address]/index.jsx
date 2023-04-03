import { Alchemy, Network } from "alchemy-sdk"
import { formatEther } from "ethers"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "../../../styles/Wallet.module.css"

const alchemy = new Alchemy({
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
})
export default function Wallet() {
  const [walletAddress, setWalletAddress] = useState()
  const [balance, setBalance] = useState()

  const router = useRouter()

  const { address } = router.query

  const getBalance = async () => {
    setBalance(await alchemy.core.getBalance(walletAddress))
  }

  useEffect(() => {
    if (address && address?.length > 30) {
      setWalletAddress(address)
      getBalance()
    }
  }, [])

  return (
    <div className={styles.walletWrapper}>
      {address}
      <form onSubmit={() => getBalance()}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Enter a wallet address or ENS"
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </div>
        <div className={styles.btnGroup} onClick={() => getBalance()}>
          <svg
            width={29}
            height={29}
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.2021 28.2021C27.9493 28.4551 27.6491 28.6557 27.3188 28.7926C26.9884 28.9295 26.6343 29 26.2766 29C25.919 29 25.5649 28.9295 25.2345 28.7926C24.9041 28.6557 24.604 28.4551 24.3512 28.2021L19.5452 23.3962C17.568 24.6616 15.2313 25.4188 12.7094 25.4188C5.69017 25.4188 0 19.7286 0 12.7094C0 5.69017 5.69017 0 12.7094 0C19.7286 0 25.4188 5.69017 25.4188 12.7094C25.4188 15.2313 24.6616 17.568 23.3962 19.5452L28.2021 24.3512C28.4551 24.604 28.6557 24.9041 28.7926 25.2345C28.9295 25.5649 29 25.919 29 26.2766C29 26.6343 28.9295 26.9884 28.7926 27.3188C28.6557 27.6491 28.4551 27.9493 28.2021 28.2021ZM12.7094 3.63125C7.69644 3.63125 3.63125 7.69462 3.63125 12.7094C3.63125 17.7241 7.69644 21.7875 12.7094 21.7875C17.7241 21.7875 21.7875 17.7241 21.7875 12.7094C21.7875 7.69462 17.7241 3.63125 12.7094 3.63125Z"
              fill="white"
            />
          </svg>
        </div>
      </form>
      {balance && (
        <div class={styles.balance}>
          Balance: {` ${formatEther(balance?.toString())}`}
        </div>
      )}
    </div>
  )
}
