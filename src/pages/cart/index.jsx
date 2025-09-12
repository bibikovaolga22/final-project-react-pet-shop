import styles from "./styles.module.css";
import { Button } from "antd";
import Title from "../../components/title";
import close from "../../assets/icons/close.svg";
import { Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../redux/slices/productSlice";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";

function Cart() {
  const { productsData, status } = useSelector((state) => state.products);
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, productsData, dispatch]);

  if (Object.keys(cartData).length === 0) {
    return (
      <section className={styles.cart_empty}>
        <Title title="Shopping cart" buttonText="Back to the store"></Title>
        <div className={styles.flex_container}>
          <p>Looks like you have no items in your basket currently.</p>
          <Button type="primary" style={{ width: "313px" }}>
            Continue Shopping
          </Button>
        </div>
      </section>
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
              <div className={styles.cart_image}>
                <img
                  src={`http://localhost:3333${product.image}`}
                  alt=""
                  className={styles.cartImage}
                />
                <div style={{ padding: "32px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "32px",
                    }}
                  >
                    <ul className={styles.description_title}>
                      <li>
                        {" "}
                        <p className={styles.title}>{product.title}</p>
                      </li>
                      <li>
                        <img
                          src={close}
                          alt=""
                          onClick={() =>
                            dispatch(removeFromCart(product.id, quantity))
                          }
                        />
                      </li>
                    </ul>
                    <ul className={styles.buttons_and_price}>
                      <li className={styles.add_item}>
                        <button
                          className={styles.minus}
                          onClick={() =>
                            dispatch(removeFromCart(product.id, 1))
                          }
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
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
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
          <Button type="primary" onClick={showModal}>
            Order
          </Button>
          <Modal
            className="custom-modal"
            closable={{ "aria-label": "Custom Close Button" }}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            centered={true}
          >
            <h4>Congratulations! </h4>
            <p>Your order has been successfully placed on the website.</p>
            <p>A manager will contact you shortly to confirm your order.</p>
          </Modal>
        </form>
      </div>
    </section>
  );
}
export default Cart;
