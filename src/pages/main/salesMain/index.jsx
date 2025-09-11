import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/slices/productSlice";
import { useEffect } from "react";
import Title from "../../../components/title";
function SalesMain() {
  const dispatch = useDispatch();
  const { productsData, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, productsData, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error loading categories</p>;
  const filteredProducts = Object.entries(productsData)
    .filter(([_id, product]) => {
      return product.discont_price != null;
    })
    .map(([_id, product]) => product);

  console.log(filteredProducts);
  return (
    <section className={styles.salesMain}>
      <Title title="Sales" buttonText="All sales"></Title>
      <ul className={styles.grid}>
        {filteredProducts.slice(0, 4).map((product) => (
          <li key={product.id}>
            <img
              src={`http://localhost:3333${product.image}`}
              alt={product.title}
            />
            <div className={styles.cardText}>
              <p>{product.title.slice(0, 15) + "..."}</p>
              <div className={styles.price}>
                <h4>
                  {product.discont_price
                    ? "$" + product.discont_price
                    : "$" + product.price}
                </h4>
                <span>{!product.discont_price ? "" : "$" + product.price}</span>
              </div>
            </div>
            {product.discount > 0 && product.discount != 100 && (
              <span className={styles.dicount}> {"-" + product.discount}%</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
export default SalesMain;
