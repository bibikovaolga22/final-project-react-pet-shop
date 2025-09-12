import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Button } from "antd";
import { Checkbox, InputNumber } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Space, Tooltip } from "antd";

const SORT_DEFAULT = "SORT_DEFAULT";
const SORT_NEWEST = "SORT_NEWEST";
const SORT_PRICE_LOW_TO_HIGH = "SORT_PRICE_LOW_TO_HIGH";
const SORT_PRICE_HIGH_TO_LOW = "SORT_PRICE_HIGH_TO_LOW";
function Sales() {
  const [minPrice, setMinPrice] = useState(undefined);
  const [maxPrice, setMaxPrice] = useState(undefined);
  const [sorted, setSorted] = useState(SORT_DEFAULT);

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
  const itemLabels = {
    [SORT_DEFAULT]: "by default",
    [SORT_NEWEST]: "newest",
    [SORT_PRICE_HIGH_TO_LOW]: "price: high to low",
    [SORT_PRICE_LOW_TO_HIGH]: "price: low to high",
  };
  const items = [
    {
      label: itemLabels[SORT_DEFAULT],
      key: SORT_DEFAULT,
    },
    {
      label: itemLabels[SORT_NEWEST],
      key: SORT_NEWEST,
    },
    {
      label: itemLabels[SORT_PRICE_HIGH_TO_LOW],
      key: SORT_PRICE_HIGH_TO_LOW,
    },
    {
      label: itemLabels[SORT_PRICE_LOW_TO_HIGH],
      key: SORT_PRICE_LOW_TO_HIGH,
    },
  ];
  const menuProps = {
    items,
    onSelect: ({ item, key, keyPath, selectedKeys, domEvent }) => {
      setSorted(key);
    },
    selectedKeys: [sorted],
    selectable: true,
  };

  const products = Object.entries(productsData)
    .map(([_id, product]) => product)
    .filter((product) => {
      let actualPrice = product.discont_price ?? product.price;
      if (minPrice) {
        if (actualPrice < minPrice) {
          return false;
        }
      }
      if (maxPrice) {
        if (actualPrice > maxPrice) {
          return false;
        }
      }
      return true;
    });
  if (sorted != SORT_DEFAULT) {
    products.sort((a, b) => {
      let aPrice = a.discont_price ?? a.price;
      let bPrice = b.discont_price ?? b.price;
      if (sorted == SORT_NEWEST) {
        return a.createdAt - b.createdAt;
      } else if (sorted == SORT_PRICE_HIGH_TO_LOW) {
        return bPrice - aPrice;
      } else {
        // SORT_PRICE_LOW_TO_HIGH
        return aPrice - bPrice;
      }
    });
  }
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
      <div className={styles.sort}>
        <ul>
          <li>
            <p>Price</p>
            <InputNumber
              min={1}
              max={1000}
              value={minPrice}
              placeholder="from"
              onChange={(newValue) => {
                setMinPrice(newValue);
              }}
              style={{ width: "112px" }}
            />
            <InputNumber
              min={1}
              max={10000}
              value={maxPrice}
              placeholder="to"
              onChange={(newValue) => {
                setMaxPrice(newValue);
              }}
              style={{ width: "112px" }}
            />
          </li>
          <li>
            <p>Sorted</p>
            <Dropdown menu={menuProps}>
              <Button
                style={{
                  fontWeight: "400",
                  width: "200px",
                }}
              >
                <Space>{itemLabels[sorted]}</Space>
              </Button>
            </Dropdown>
          </li>
        </ul>
      </div>
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
