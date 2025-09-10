import styles from "./styles.module.css";
import { useEffect } from "react";
import { fetchCategories } from "../../../redux/slices/categorySlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
const contentStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "32px",
  overflow: "hidden",
  padding: "40px 0px",
};

function CategoriesMain() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.categories);

  const navigate = useNavigate();

  const handleCardClick = (category) => {
    navigate(`/categories/${category.id}`);
  };
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  return (
    <section className={styles.carousel}>
      <div className={styles.title}>
        <h2>Categories</h2>
        <Button>All categories</Button>
      </div>

      <ul style={contentStyle}>
        {data?.slice(0, 4).map((category) => (
          <li key={category.id} onClick={() => handleCardClick(category)}>
            <img src={`http://localhost:3333${category.image}`} alt="dvs" />
            <p>{category.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CategoriesMain;
