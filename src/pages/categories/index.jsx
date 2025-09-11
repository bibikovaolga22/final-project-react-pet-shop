import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import styles from "./styles.module.css";
import { useEffect } from "react";
import { Breadcrumb, Button } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Categories() {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.categories);
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
      console.log("Categories data:", data);
    }
  }, [status, data, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error loading categories</p>;

  const handleCardClick = (category) => {
    navigate(`/categories/${category.id}`);
  };
  return (
    <section className={styles.categories}>
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
                    color: "#000000ff",
                    fontWeight: "500",
                  }}
                >
                  Categories
                </Button>
              </Link>
            ),
          },
        ]}
      />
      <h2>Categories</h2>
      <ul className={styles.grid}>
        {data.map((category) => (
          <li key={category.id} onClick={() => handleCardClick(category)}>
            <img
              src={`http://localhost:3333${category.image}`}
              alt={category.title}
            />

            <p>{category.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default Categories;
