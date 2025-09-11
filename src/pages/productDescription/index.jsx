import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { Breadcrumb, Button } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../redux/slices/productSlice";

function ProductDescription() {
  const { productsData, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, productsData, dispatch]);

  const [quantity, setQuantity] = useState(1);

  const params = useParams();
  const product = productsData[params.productId];
  console.log(product);
  return (
    <section className={styles.productsDescription}>
      <Breadcrumb
        separator={
          <div
            style={{
              height: "1px",
              width: "16px",
              backgroundColor: "#DDDDDD",
              marginInline: "-1px",
              marginTop: "15px",
            }}
          />
        }
        items={[
          {
            title: (
              <Link to="/">
                <Button
                  style={{
                    color: "#8B8B8B",
                    fontWeight: "500",
                  }}
                >
                  Main page
                </Button>
              </Link>
            ),
          },
          {
            title: (
              <Link to="/categories">
                {" "}
                <Button
                  style={{
                    color: "#8B8B8B",
                    fontWeight: "500",
                  }}
                >
                  Categories
                </Button>
              </Link>
            ),
          },
          {
            title: (
              <Link to="/categories/1">
                <Button
                  style={{
                    color: "#8B8B8B",
                    fontWeight: "500",
                  }}
                >
                  Dry & Wet Food
                </Button>
              </Link>
            ),
          },
          {
            title: <Button>Dry Dog Food</Button>,
          },
        ]}
      />
      <div className={styles.product_description_gallery}>
        <div className={styles.gallery}>
          <ul className={styles.small}>
            <li className={styles.itemOne}>
              <img src={`http://localhost:3333${product?.image}`} alt="" />
            </li>
            <li className={styles.itemTwo}>
              <img src={`http://localhost:3333${product?.image}`} alt="" />
            </li>
            <li className={styles.itemThree}>
              <img src={`http://localhost:3333${product?.image}`} alt="" />
            </li>
          </ul>
          <img
            src={`http://localhost:3333${product?.image}`}
            alt=""
            className={styles.bigImg}
          />
        </div>
        <div className={styles.mainContent}>
          <h4> {product?.title}</h4>
          <ul className={styles.itemPrice}>
            <li>
              {" "}
              {product?.discont_price
                ? "$" + product.discont_price
                : "$" + product?.price}
            </li>
            <li className={styles.oldPrice}>
              {!product?.discont_price ? "" : "$" + product.price}
            </li>
            <li className={styles.discountItem}>
              {" "}
              {product?.discount > 0 && product?.discount != 100 && (
                <span className={styles.dicount}>
                  {" "}
                  {"-" + product?.discount}%
                </span>
              )}
            </li>
          </ul>

          <div className={styles.add_to_cart}>
            <div className={styles.add_item}>
              <button
                className={styles.minus}
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  }
                }}
              >
                -
              </button>
              <p>{quantity}</p>
              <button
                className={styles.plus}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              className={styles.add_to_cart_btn}
              onClick={() => dispatch(addToCart(product.id, quantity))}
            >
              Add to cart
            </button>
          </div>
          <div className={styles.description}>
            <h5>Description</h5>
            <p>{product?.description}</p>
            <span className={styles.readMore}>Read more</span>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ProductDescription;
