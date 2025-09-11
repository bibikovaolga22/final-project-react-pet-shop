import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Sort from "../../components/sort";
import { Breadcrumb, Button } from "antd";
function Sales() {
  const dispatch = useDispatch();
  const { productsData, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
      console.log("Categories data:", productsData);
    }
  }, [status, productsData, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error loading categories</p>;

  return (
    <section className={styles.sales}>
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
              <Link to="/categories/1">
                <Button
                  style={{
                    color: "#8B8B8B",
                    fontWeight: "500",
                  }}
                >
                  All sales
                </Button>
              </Link>
            ),
          },
          {
            title: <Button>Dry Dog Food</Button>,
          },
        ]}
      />
      <h2>Discounted Items</h2>
      <Sort />
      <ul className={styles.grid}>
        {Object.entries(productsData)
          .filter(
            ([_id, product]) => product.discount > 0 && product.discount !== 100
          )
          .map(([_id, product]) => (
            <li key={product.id}>
              <img
                src={`http://localhost:3333${product.image}`}
                alt={product.title}
              />
              <button className={styles.cardButton}>Add to cart</button>
              <div className={styles.cardText}>
                <p>{product.title.slice(0, 15) + "..."}</p>
                <div className={styles.price}>
                  <h4>
                    {product.discont_price
                      ? "$" + product.discont_price
                      : "$" + product.price}
                  </h4>
                  <span>
                    {!product.discont_price ? "" : "$" + product.price}
                  </span>
                </div>
              </div>
              <span className={styles.discount}>-{product.discount}%</span>
            </li>
          ))}
      </ul>
    </section>
  );
}
export default Sales;
