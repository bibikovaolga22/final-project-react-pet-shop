import Logo from "../../assets/icons/logo.svg";
import Cart from "../../assets/icons/cart.svg";
import styles from "./styles.module.css";
function Header() {
  return (
    <header>
      <img src={Logo} alt="Logo" />
      <ul className={styles.menu}>
        <li>Main page</li>
        <li>Categories</li>
        <li>All products</li>
        <li>All sales</li>
      </ul>
      <img src={Cart} alt="cart" className={styles.cart} />
    </header>
  );
}
export default Header;
