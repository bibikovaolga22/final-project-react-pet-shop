import styles from "./styles.module.css";
import React from "react";
import { Checkbox, InputNumber } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Space, Tooltip } from "antd";

const handleMenuClick = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};
const items = [
  {
    label: "default item",
    key: "1",
  },
  {
    label: "newest",
    key: "2",
  },
  {
    label: "price: hight to low",
    key: "3",
  },
  {
    label: "price: low to high",
    key: "4",
  },
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};
const handleCheckboxOnChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};
const handleInputOnChange = (value) => {
  console.log("changed", value);
};
function Sort() {
  return (
    <section className={styles.sort}>
      <ul>
        <li>
          <p>Price</p>
          <InputNumber
            min={1}
            max={10}
            defaultValue={1}
            onChange={handleInputOnChange}
            style={{ width: "112px" }}
          />
          <InputNumber
            min={1}
            max={10}
            defaultValue={1}
            onChange={handleInputOnChange}
            style={{ width: "112px" }}
          />
        </li>
        <li>
          <p>Discounted Items</p>
          <Checkbox onChange={handleCheckboxOnChange}> </Checkbox>{" "}
        </li>
        <li>
          <p>Sorted</p>
          <Space wrap>
            <Dropdown menu={menuProps}>
              <Button
                style={{
                  fontWeight: "400",
                  width: "200px",
                }}
              >
                <Space>
                  by default
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </Space>
        </li>
      </ul>
    </section>
  );
}
export default Sort;
