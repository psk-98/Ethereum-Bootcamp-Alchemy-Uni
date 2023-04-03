import styles from "../../styles/Footer.module.css"

export default function Footer() {
  return (
    <div className={styles.footer}>
      <a
        className={styles.copyrightSec}
        href="https://paulkhoza.netlify.app/"
        target="_blank"
        rel="noreferrer"
        aria-label="Link to developer portfolio"
      >
        &copy; {new Date().getFullYear()} Design and Built by Paul Khoza
      </a>
    </div>
  )
}
