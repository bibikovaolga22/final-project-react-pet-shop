import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import styles from "./styles.module.css";
import { useEffect } from "react";

function Categories() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
      console.log("Categories data:", data);
    }
  }, [status, data, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error loading categories</p>;

  return (
    <section className={styles.categories}>
      <h2>Categories</h2>
      <ul className={styles.grid}>
        {data.map((category) => (
          <li key={category.id}>
            <img
              src={`http://localhost:3333${category.image}`}
              alt={category.title}
              width={300}
            />
            <p>{category.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default Categories;
