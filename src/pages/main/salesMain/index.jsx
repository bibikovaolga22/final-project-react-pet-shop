import styles from "./styles.module.css";
import SalesItem from "../../../components/salesItem";
import { Button } from "antd";
function SalesMain() {
  return (
    <section className={styles.salesMain}>
      <div className={styles.salesTitle}>
        <h2>Sales</h2>
        <Button>All sales</Button>
      </div>
      <SalesItem />
    </section>
  );
}

export default SalesMain;
