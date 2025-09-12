import Logo from "../../assets/icons/logo.svg";
import Cart from "../../assets/icons/cart.svg";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const cartData = useSelector((state) => state.cart);
  let totalQuantity = 0;
  for (let [productId, quantity] of Object.entries(cartData)) {
    totalQuantity += quantity;
  }
  return (
    <header>
      <Link to="/pageIsNotFound ">
        <img src={Logo} alt="Logo" />
      </Link>
      <ul className={styles.menu}>
        <li>
          {" "}
          <Link to="/ ">Main page</Link>
        </li>{" "}
        <li>
          <Link to="/categories">Categories</Link>
        </li>
        <li>
          <Link to="/products">All products</Link>
        </li>{" "}
        <li>
          <Link to="/sales">All sales</Link>
        </li>
      </ul>
      <Link to="/cart ">
        {" "}
        <span className={styles.badge}>{totalQuantity}</span>
        <img src={Cart} alt="cart" className={styles.cart} />
      </Link>
    </header>
  );
}
export default Header;
