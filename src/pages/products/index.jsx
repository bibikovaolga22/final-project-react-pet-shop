import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import { useEffect, useState } from "react";
import { Breadcrumb, Button } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Checkbox, InputNumber } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Space, Tooltip } from "antd";

const SORT_DEFAULT = "SORT_DEFAULT";
const SORT_NEWEST = "SORT_NEWEST";
const SORT_PRICE_LOW_TO_HIGH = "SORT_PRICE_LOW_TO_HIGH";
const SORT_PRICE_HIGH_TO_LOW = "SORT_PRICE_HIGH_TO_LOW";

function Products() {
  const [minPrice, setMinPrice] = useState(undefined);
  const [maxPrice, setMaxPrice] = useState(undefined);
  const [showDiscountedOnly, setDiscounted] = useState(false);
  const [sorted, setSorted] = useState(SORT_DEFAULT);

  const dispatch = useDispatch();
  const { productsData, status } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const handleCardClick = (product) => {
    navigate(`/products/${product.id}`);
  };

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
      if (showDiscountedOnly) {
        if (!product.discont_price) {
          return false;
        }
      }
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
    <section className={styles.products}>
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
            title: <Button>All products</Button>,
          },
        ]}
      />
      <h2>All products</h2>
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
            <p>Discounted Items</p>
            <Checkbox
              checked={showDiscountedOnly}
              onChange={(event) => {
                setDiscounted(event.target.checked);
              }}
            >
              {" "}
            </Checkbox>{" "}
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
        {products.map((product) => (
          <li key={product.id} onClick={() => handleCardClick(product)}>
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
            {product.discount > 0 && product.discount != 100 && (
              <span className={styles.dicount}> {"-" + product.discount}%</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
export default Products;
