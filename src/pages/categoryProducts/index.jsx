import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Button } from "antd";
import { useParams } from "react-router-dom";
import { fetchCategoryProducts } from "../../redux/slices/categoryProductsSlice";

function CategoryProducts() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.categoryProducts);
  const params = useParams();
  const categoryId = params.categoryId;
  useEffect(() => {
    dispatch(fetchCategoryProducts(categoryId));
  }, [categoryId, dispatch]);
  console.log(data);
  return (
    <section className={styles.categoryProduct}>
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
            title: <Button>Dry & Wet Food</Button>,
          },
        ]}
      />
      <h2>{data.category?.title} </h2>
      <ul className={styles.grid}>
        {data.data?.map((product) => (
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
                <span>{!product.discont_price ? "" : "$" + product.price}</span>
              </div>
            </div>
            {product.discont_price && (
              <span className={styles.discount}>
                {"-" +
                  Math.round(
                    ((product.price - product.discont_price) / product.price) *
                      100
                  ) +
                  "%"}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
export default CategoryProducts;
