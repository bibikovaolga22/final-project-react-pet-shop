import Logo from "../../assets/icons/logo.svg";
import Cart from "../../assets/icons/cart.svg";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header>
      <img src={Logo} alt="Logo" />
      <ul className={styles.menu}>
        <Link to="/ "></Link>
        <li>Main page</li>
        <Link to="/categories "></Link>
        <li>Categories</li>
        <Link to="/products "></Link>
        <li>All products</li>
        <Link to="/sales"></Link>
        <li>All sales</li>
      </ul>
      <img src={Cart} alt="cart" className={styles.cart} />
    </header>
  );
}
export default Header;
