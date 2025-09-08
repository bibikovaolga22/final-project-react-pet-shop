import Logo from "../../assets/icons/logo.svg";
import Cart from "../../assets/icons/cart.svg";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header>
      <img src={Logo} alt="Logo" />
      <ul className={styles.menu}>
        <li>
          {" "}
          <Link to="/ ">Main page</Link>
        </li>{" "}
        <li>
          <Link to="/categories">Categories</Link>
        </li>
        <li>
          <Link to="/products ">All products</Link>
        </li>{" "}
        <li>
          <Link to="/sales">All sales</Link>
        </li>
      </ul>
      <img src={Cart} alt="cart" className={styles.cart} />
    </header>
  );
}
export default Header;
