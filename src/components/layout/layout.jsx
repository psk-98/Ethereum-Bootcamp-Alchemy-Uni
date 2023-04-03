import { Inter } from "next/font/google"
import Footer from "./footer"
import Nav from "./nav"

const inter = Inter({
  subsets: ["latin"],
})

const Layout = ({ children }) => {
  return (
    <div className={inter.className}>
      <Nav />
      <div className="container">{children}</div>
      <Footer />
    </div>
  )
}
export default Layout
