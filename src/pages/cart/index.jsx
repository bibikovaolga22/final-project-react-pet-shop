import styles from "./styles.module.css";
import { Button } from "antd";
import Title from "../../components/title";
import close from "../../assets/icons/close.svg";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../redux/slices/productSlice";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";

function Cart() {
  const { productsData, status } = useSelector((state) => state.products);
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, productsData, dispatch]);

  if (Object.keys(cartData).length === 0) {
    return (
      <div className={styles.cart_empty}>
        <Title title="Shopping cart" buttonText="Back to the store"></Title>
        <div className={styles.flex_container}>
          <p>Looks like you have no items in your basket currently.</p>
          <Button type="primary" style={{ width: "313px" }}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }
  let totalPrice = 0;
  for (let [productId, quantity] of Object.entries(cartData)) {
    let product = productsData[productId];
    if (product.discont_price) {
      totalPrice += product.discont_price * quantity;
    } else {
      totalPrice += product.price * quantity;
    }
  }
  return (
    <section className={styles.cart_full}>
      <div className={styles.itemsContainer}>
        {Object.entries(cartData).map(([productId, quantity]) => {
          const product = productsData[productId];

          return (
            <div key={product.id}>
              <ul className={styles.cart_image}>
                <li>
                  <img
                    src={`http://localhost:3333${product.image}`}
                    alt=""
                    className={styles.cartImage}
                  />
                </li>
                <li className={styles.add_bottons}>
                  <p className={styles.title}>{product.title}</p>
                  <div className={styles.add_item}>
                    <button
                      className={styles.minus}
                      onClick={() => dispatch(removeFromCart(product.id, 1))}
                    >
                      -
                    </button>
                    <p>{quantity}</p>
                    <button
                      className={styles.plus}
                      onClick={() => dispatch(addToCart(product.id, 1))}
                    >
                      +
                    </button>
                  </div>
                </li>
                <li className={styles.discount_price}>
                  <h4>
                    {product.discont_price
                      ? "$" + product.discont_price * quantity
                      : "$" + product.price * quantity}
                  </h4>
                  <span>
                    {!product.discont_price
                      ? ""
                      : "$" + product.price * quantity}
                  </span>
                </li>
                <li className={styles.close}>
                  <img
                    src={close}
                    alt=""
                    onClick={() =>
                      dispatch(removeFromCart(product.id, quantity))
                    }
                  />
                </li>
              </ul>
            </div>
          );
        })}

        <div className={styles.form_container}>
          <ul>
            <h4>Order details</h4>
            <p>3 Items</p>
            <ul className={styles.total}>
              <li>Total</li>
              <li>${totalPrice}</li>
            </ul>
          </ul>
          <form>
            <Input placeholder="Name" />
            <Input placeholder="Phone Number" />
            <Input placeholder="Email" />
            <Button type="primary">Order</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
export default Cart;
