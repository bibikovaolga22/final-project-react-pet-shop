import styles from "./styles.module.css";
import { Button } from "antd";
function Banner() {
  return (
    <section className={styles.banner}>
      <h1>Amazing Discounts on Pets Products!</h1>

      <Button type="primary">Check out</Button>
    </section>
  );
}
export default Banner;
